import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X } from "lucide-react";
import JobDetailsModal from './JobDetailsModal';
import { fetchJobs, fetchCategories } from "@/components/services/api";

function JobsTable() {
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
        
        // Normalize job data to match table structure
        const normalizedJobs = jobsData.jobs.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company_name,
          type: job.job_type,
          category: job.category,
          location: job.candidate_required_location || 'Location not specified',
          publication_date: job.publication_date,
          salary: job.salary
        }));
        
        setJobs(normalizedJobs);

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

  const filteredJobs = jobs.filter(job => (
    (filters.search === '' || 
     job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
     job.company.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.jobType === 'All' || job.type === filters.jobType) &&
    (filters.category === 'All' || job.category === filters.category) &&
    (!filters.remoteOnly || job.location.toLowerCase().includes('remote'))
  ));

  const resetFilters = () => {
    setFilters({
      search: '',
      jobType: 'All',
      category: 'All',
      remoteOnly: false
    });
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h3 className="text-lg font-medium text-red-500">Error loading jobs</h3>
        <p className="text-gray-500 mt-2">{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white rounded-lg border">
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

        {/* Job Type Dropdown */}
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

        {/* Category Dropdown */}
        <Select 
          value={filters.category} 
          onValueChange={(value) => setFilters({...filters, category: value})}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
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
            Remote Only
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

      {/* Jobs Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="space-y-2">
                    <p className="font-medium">Loading jobs...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>
                    <span className="capitalize">
                      {job.type.replace('_', '-')}
                    </span>
                  </TableCell>
                  <TableCell>{job.category}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.salary || 'Not specified'}</TableCell>
                  <TableCell>
                    <JobDetailsModal jobId={job.id}>
                      <Button variant="outline" size="sm">View</Button>
                    </JobDetailsModal>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="space-y-2">
                    <p className="font-medium">No jobs found</p>
                    <p className="text-sm text-gray-500">
                      Try adjusting your search filters
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={resetFilters}
                      className="mt-2"
                    >
                      Reset filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default JobsTable;