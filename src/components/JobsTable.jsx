
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import JobDetailsModal from './JobDetailsModal'

function JobsTable() {
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
      ]
    
      return (
        <div className="container mx-auto px-4 py-8">
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
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>{job.category}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                   <JobDetailsModal/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
}

export default JobsTable