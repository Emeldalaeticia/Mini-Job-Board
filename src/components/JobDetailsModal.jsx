import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function JobDetailsModal() {
  // Mock job data - replace with your actual data
  const jobDetails = {
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    type: "Full-time",
    location: "Remote",
    category: "Technology",
    description: "We're looking for an experienced React developer to join our team. You'll be working on building modern web applications using React, Next.js, and TypeScript.",
    requirements: [
      "5+ years of experience with React",
      "Strong knowledge of JavaScript/TypeScript",
      "Experience with state management (Redux, Zustand, or Context API)",
      "Familiarity with RESTful APIs and GraphQL",
      "Experience with testing frameworks (Jest, React Testing Library)"
    ]
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Job Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{jobDetails.title}</DialogTitle>
          <div className="space-y-1">
            <p className="font-medium">{jobDetails.company}</p>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>{jobDetails.type}</span>
              <span>{jobDetails.location}</span>
              <span>{jobDetails.category}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <section>
            <h3 className="font-semibold text-lg mb-2">Full Job Description</h3>
            <p className="text-gray-700">{jobDetails.description}</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg mb-2">Requirements</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {jobDetails.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex justify-end">
          <Button className="w-full sm:w-auto">Apply Now</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default JobDetailsModal