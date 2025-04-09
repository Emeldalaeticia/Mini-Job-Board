import React, { useState } from 'react';
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

function JobsTable() {
  const [filters, setFilters] = useState({
    search: '',
    jobType: 'All',
    category: 'All',
    remoteOnly: false
  });

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
  ];

  const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Internship"];
  const categories = ["All", "Technology", "Marketing", "Healthcare", "Finance", "Other"];

  // Filter jobs based on active filters
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
              <SelectItem key={type} value={type}>{type}</SelectItem>
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
              <SelectItem key={category} value={category}>{category}</SelectItem>
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>{job.category}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                  <JobDetailsModal>
                    <Button variant="outline" size="sm">View</Button>
                  </JobDetailsModal>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
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
  );
}

export default JobsTable;