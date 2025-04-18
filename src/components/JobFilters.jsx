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
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchCategories } from "@/services/api"

export function JobFilters({ filters, setFilters }) {
  const [categories, setCategories] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [categoriesError, setCategoriesError] = useState(null)

  // Define job types with proper display names
  const jobTypes = [
    { value: "All", label: "All" },
    { value: "full_time", label: "Full-time" },
    { value: "part_time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" }
  ]

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoadingCategories(true)
      try {
        const data = await fetchCategories()
        setCategories(['All', ...data])
        setCategoriesError(null)
      } catch (err) {
        setCategoriesError(err.message || "Failed to load categories")
        console.error("Categories fetch error:", err)
      } finally {
        setIsLoadingCategories(false)
      }
    }

    loadCategories()
  }, [])

  const handleResetFilters = () => {
    setFilters({
      search: '',
      jobType: 'All',
      category: 'All',
      remoteOnly: false
    })
  }

  const handleCategoryChange = (value) => {
    setFilters({
      ...filters,
      category: value === 'All' ? 'All' : value.toLowerCase().replace(/\s+/g, '-')
    })
  }

  const handleRemoteOnlyChange = (checked) => {
    // The checked parameter might be a boolean or a string "indeterminate"
    // We need to ensure we only use boolean values
    const isChecked = checked === true;
    setFilters({
      ...filters,
      remoteOnly: isChecked
    })
  }

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
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          {isLoadingCategories ? (
            <div className="animate-pulse h-10 w-full rounded-md bg-gray-100" />
          ) : categoriesError ? (
            <div className="text-sm text-red-500">{categoriesError}</div>
          ) : (
            <Select 
              value={filters.category} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Remote Only Toggle */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remote-only"
            checked={filters.remoteOnly || false} // Fallback to false if undefined
            onCheckedChange={handleRemoteOnlyChange}
          />
          <label htmlFor="remote-only" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Remote only
          </label>
        </div>

        {/* Reset Filters */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleResetFilters}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
}