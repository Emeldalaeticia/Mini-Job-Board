import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function JobFilters({ filters, setFilters }) {
  const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Internship"]
  const categories = ["All", "Technology", "Healthcare", "Finance", "Marketing", "Other"]

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search jobs..."
          className="pl-10"
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Job Type Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Job Type</label>
          <Select 
            value={filters.jobType} 
            onValueChange={(value) => setFilters({...filters, jobType: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select 
            value={filters.category} 
            onValueChange={(value) => setFilters({...filters, category: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Remote Only Toggle */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remote-only" 
            checked={filters.remoteOnly}
            onCheckedChange={(checked) => setFilters({...filters, remoteOnly: checked})}
          />
          <label htmlFor="remote-only" className="text-sm font-medium">
            Remote only
          </label>
        </div>

        {/* Reset Filters */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setFilters({
            search: '',
            jobType: 'All',
            category: 'All',
            remoteOnly: false
          })}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
}