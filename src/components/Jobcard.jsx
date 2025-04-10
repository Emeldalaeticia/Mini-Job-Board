import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, X } from "lucide-react"
import JobDetailsModal from './JobDetailsModal'
import { Skeleton } from "@/components/ui/skeleton"
import { fetchJobs, fetchCategories } from "@/components/services/api"

function Jobcard() {
  const [filters, setFilters] = useState({
    search: '',
    jobType: 'All',
    category: 'All',
    remoteOnly: false // Changed initial state to false
  })

  const [jobs, setJobs] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const jobsData = await fetchJobs({
          limit: 21,
          ...(filters.search && { search: filters.search }),
          ...(filters.category !== 'All' && { category: filters.category.toLowerCase() }),
          ...(filters.remoteOnly && { location: 'remote' }) // Add remote filter to API call
        })
        setJobs(jobsData.jobs)

        if (categories.length === 0) {
          const categoriesData = await fetchCategories()
          setCategories(['All', ...categoriesData])
        }
      } catch (err) {
        setError(err.message || 'An unknown error occurred')
        console.error('Error fetching data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchData, 500)
    return () => clearTimeout(debounceTimer)
  }, [filters.search, filters.category, filters.remoteOnly, categories.length])

  const jobTypes = [
    { value: 'All', label: 'All' },
    { value: 'full_time', label: 'Full-time' },
    { value: 'part_time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ];

  // Client-side filtering (only for job type now since others are handled by API)
  const filteredJobs = jobs.filter(job => (
    (filters.search === '' || 
     job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
     (job.company_name && job.company_name.toLowerCase().includes(filters.search.toLowerCase()))) &&
    (filters.jobType === 'All' || job.job_type === filters.jobType) &&
    (!filters.remoteOnly || (job.location && job.location.toLowerCase().includes('remote')))
  ))
  
  const resetFilters = () => {
    setFilters({
      search: '',
      jobType: 'All',
      category: 'All',
      remoteOnly: false
    })
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h3 className="text-lg font-medium text-red-500">Error loading jobs</h3>
        <p className="text-gray-500 mt-2">{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Bar */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs..."
              className="pl-10"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>

          {/* Job Type Filter */}
          <Select 
    value={filters.jobType} 
    onValueChange={(value) => setFilters({...filters, jobType: value})}
  >
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Job Type" />
    </SelectTrigger>
    <SelectContent>
      {jobTypes.map((type) => (
        <SelectItem key={type.value} value={type.value}>
          {type.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>


          {/* Category Filter */}
          <Select 
            value={filters.category} 
            onValueChange={(value) => setFilters({...filters, category: value})}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Remote Only Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remote-only" 
              checked={filters.remoteOnly}
              onCheckedChange={(checked) => setFilters({...filters, remoteOnly: checked})}
            />
            <label htmlFor="remote-only" className="text-sm whitespace-nowrap">
              Remote only
            </label>
          </div>

          {/* Reset Button */}
          <Button 
            variant="outline" 
            onClick={resetFilters}
            className="whitespace-nowrap"
          >
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Job Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <CardDescription className="font-medium">
                  {job.company_name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {job.job_type}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {job.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </div>
              </CardContent>
              <CardFooter>
                <JobDetailsModal jobId={job.id}>
                  <Button className="w-full">View Details</Button>
                </JobDetailsModal>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center py-12">
          <h3 className="text-lg font-medium">No jobs found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
          <Button variant="outline" className="mt-4" onClick={resetFilters}>
            Reset filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default Jobcard