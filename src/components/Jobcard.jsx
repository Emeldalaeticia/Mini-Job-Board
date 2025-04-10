import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search, X } from "lucide-react";

import { fetchJobs, fetchCategories } from "@/components/services/api";
import JobList from './JobList'; 

function Jobcard() {
  const [filters, setFilters] = useState({
    search: '',
    jobType: 'All',
    category: 'All',
    remoteOnly: false
  });

  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const jobsData = await fetchJobs({
          limit: 21,
          ...(filters.search && { search: filters.search }),
          ...(filters.category !== 'All' && { category: filters.category.toLowerCase() }),
          ...(filters.remoteOnly && { location: 'remote' })
        });
        
        setJobs(jobsData.jobs);
  
        if (categories.length === 0) {
          const categoriesData = await fetchCategories();
          setCategories(['All', ...categoriesData]);
        }
      } catch (err) {
        setError(err.message || 'An unknown error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    const debounceTimer = setTimeout(fetchData, 500);
    return () => clearTimeout(debounceTimer);
  }, [filters.search, filters.category, filters.remoteOnly, categories.length]);

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
  ));

  const resetFilters = () => {
    setFilters({
      search: '',
      jobType: 'All',
      category: 'All',
      remoteOnly: false
    });
  };

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
          {/* <div className="flex items-center space-x-2">
            <Checkbox 
              id="remote-only" 
              checked={filters.remoteOnly}
              onCheckedChange={(checked) => setFilters({...filters, remoteOnly: checked})}
            />
            <label htmlFor="remote-only" className="text-sm whitespace-nowrap">
              Remote only
            </label>
          </div> */}

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

      {/* Job Listings */}
      <JobList 
        jobs={filteredJobs}
        isLoading={isLoading}
        error={error}
        resetFilters={resetFilters}
      />
    </div>
  );
}

export default Jobcard;