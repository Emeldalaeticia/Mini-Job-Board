import React, { useState } from 'react'
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
import { Search, Filter, X } from "lucide-react"
import JobDetailsModal from './JobDetailsModal'

function Jobcard() {
  const [filters, setFilters] = useState({
    search: '',
    jobType: 'All',
    category: 'All',
    remoteOnly: false
  })

  const jobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp Inc.",
      type: "Full-time",
      location: "Remote",
      category: "Technology"
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Creative Solutions",
      type: "Part-time",
      location: "New York, NY",
      category: "Marketing"
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Analytics Pro",
      type: "Contract",
      location: "San Francisco, CA",
      category: "Technology"
    },
    // Add more jobs...
  ]

  const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Internship"]
  const categories = ["All", "Technology", "Marketing", "Healthcare", "Finance", "Other"]

  // Filter jobs based on active filters
  const filteredJobs = jobs.filter(job => {
    return (
      (filters.search === '' || 
       job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
       job.company.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.jobType === 'All' || job.type === filters.jobType) &&
      (filters.category === 'All' || job.category === filters.category) &&
      (!filters.remoteOnly || job.location.toLowerCase().includes('remote'))
    )
  })

  const resetFilters = () => {
    setFilters({
      search: '',
      jobType: 'All',
      category: 'All',
      remoteOnly: false
    })
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
                <SelectItem key={type} value={type}>{type}</SelectItem>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <CardDescription className="font-medium">
                  {job.company}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {job.type}
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
                <JobDetailsModal>
                  <Button className="w-full">View Details</Button>
                </JobDetailsModal>
              </CardFooter>
            </Card>
          ))
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
    </div>
  )
}

export default Jobcard