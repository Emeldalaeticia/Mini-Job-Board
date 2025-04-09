import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import JobDetailsModal from './JobDetailsModal'

function Jobcard() {
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
    
      return (
        <div className="container mx-auto px-4 py-8">
          {/* Responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
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
                    <JobDetailsModal className="w-full">

                    </JobDetailsModal>

                
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )
}

export default Jobcard