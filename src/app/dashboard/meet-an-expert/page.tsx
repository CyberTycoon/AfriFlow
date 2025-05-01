"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Star, MapPin, Briefcase, Phone, Mail, Filter } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Sample consultant data
const consultants = [
  {
    id: 1,
    name: "Dr. Amara Okafor",
    specialty: "Business Strategy",
    rating: 4.9,
    reviews: 127,
    location: "Lagos, Nigeria",
    image: "/woman2.jpg",
    experience: "15+ years",
    industries: ["Technology", "Finance", "Healthcare"],
    languages: ["English", "Yoruba", "French"],
    bio: "Experienced business strategist with expertise in African markets and global expansion.",
    hourlyRate: "$120",
    availability: "Available next week",
    email: "amara.okafor@example.com",
    phone: "+234 123 456 7890"
  },
  {
    id: 2,
    name: "Emmanuel Kwame",
    specialty: "Trade & Export",
    rating: 4.7,
    reviews: 98,
    location: "Accra, Ghana",
    image: "/man1.jpg",
    experience: "12+ years",
    industries: ["Agriculture", "Manufacturing", "Retail"],
    languages: ["English", "Twi", "Hausa"],
    bio: "Expert in African trade regulations and export strategies for small to medium businesses.",
    hourlyRate: "$95",
    availability: "Available this week",
    email: "emmanuel.kwame@example.com",
    phone: "+233 987 654 3210"
  },
  {
    id: 3,
    name: "Fatima Diallo",
    specialty: "Financial Advisory",
    rating: 4.8,
    reviews: 156,
    location: "Dakar, Senegal",
    image: "/woman1.jpg",
    experience: "10+ years",
    industries: ["Banking", "Microfinance", "Insurance"],
    languages: ["French", "Wolof", "English"],
    bio: "Financial expert specializing in microfinance and sustainable business models in West Africa.",
    hourlyRate: "$110",
    availability: "Available in 2 days",
    email: "fatima.diallo@example.com",
    phone: "+221 765 432 109"
  },
  {
    id: 4,
    name: "Tendai Moyo",
    specialty: "Tech Entrepreneurship",
    rating: 4.6,
    reviews: 87,
    location: "Harare, Zimbabwe",
    image: "/man2.jpg",
    experience: "8+ years",
    industries: ["Software", "E-commerce", "EdTech"],
    languages: ["English", "Shona", "Ndebele"],
    bio: "Tech entrepreneur and consultant helping startups scale across Southern Africa.",
    hourlyRate: "$85",
    availability: "Available tomorrow",
    email: "tendai.moyo@example.com",
    phone: "+263 712 345 678"
  },
  {
    id: 5,
    name: "Nala Abebe",
    specialty: "Supply Chain Management",
    rating: 4.9,
    reviews: 112,
    location: "Addis Ababa, Ethiopia",
    image: "/woman3.jpg",
    experience: "14+ years",
    industries: ["Logistics", "Manufacturing", "FMCG"],
    languages: ["Amharic", "English", "Arabic"],
    bio: "Supply chain expert with experience optimizing logistics across East Africa and the Middle East.",
    hourlyRate: "$105",
    availability: "Available next week",
    email: "nala.abebe@example.com",
    phone: "+251 911 234 567"
  },
  {
    id: 6,
    name: "Jean-Pierre Mutombo",
    specialty: "Mining & Natural Resources",
    rating: 4.7,
    reviews: 76,
    location: "Kinshasa, DRC",
    image: "/man3.jpg",
    experience: "20+ years",
    industries: ["Mining", "Energy", "Infrastructure"],
    languages: ["French", "Lingala", "English", "Swahili"],
    bio: "Expert in sustainable mining practices and natural resource management in Central Africa.",
    hourlyRate: "$150",
    availability: "Available in 3 days",
    email: "jp.mutombo@example.com",
    phone: "+243 999 888 777"
  },
  {
    id: 7,
    name: "Zainab El-Amin",
    specialty: "Marketing & Branding",
    rating: 4.8,
    reviews: 143,
    location: "Cairo, Egypt",
    image: "/woman4.jpeg",
    experience: "11+ years",
    industries: ["Consumer Goods", "Hospitality", "Telecommunications"],
    languages: ["Arabic", "English", "French"],
    bio: "Marketing strategist helping brands connect with North African and Middle Eastern markets.",
    hourlyRate: "$115",
    availability: "Available this week",
    email: "zainab.elamin@example.com",
    phone: "+20 100 123 4567"
  },
  {
    id: 8,
    name: "Kofi Mensah",
    specialty: "Legal & Compliance",
    rating: 4.9,
    reviews: 92,
    location: "Kumasi, Ghana",
    image: "/man4.jpg",
    experience: "16+ years",
    industries: ["Banking", "Telecommunications", "Energy"],
    languages: ["English", "Twi", "Ga"],
    bio: "Legal expert specializing in business compliance and regulations across West African markets.",
    hourlyRate: "$130",
    availability: "Available next week",
    email: "kofi.mensah@example.com",
    phone: "+233 244 567 890"
  }
];

// Specialty options for filtering
const specialties = [
  "All Specialties",
  "Business Strategy",
  "Trade & Export",
  "Financial Advisory",
  "Tech Entrepreneurship",
  "Supply Chain Management",
  "Mining & Natural Resources",
  "Marketing & Branding",
  "Legal & Compliance"
];

// Location options for filtering
const locations = [
  "All Locations",
  "Lagos, Nigeria",
  "Accra, Ghana",
  "Dakar, Senegal",
  "Harare, Zimbabwe",
  "Addis Ababa, Ethiopia",
  "Kinshasa, DRC",
  "Cairo, Egypt",
  "Kumasi, Ghana"
];

export default function ConsultantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [showFilters, setShowFilters] = useState(false)

  // Filter consultants based on search term, specialty, and location
  const filteredConsultants = consultants.filter(consultant => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          consultant.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          consultant.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === "All Specialties" || consultant.specialty === selectedSpecialty;
    
    const matchesLocation = selectedLocation === "All Locations" || consultant.location === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
            Professional Consultants
          </h1>
          <p className="text-amber-100/70">
            Connect with expert consultants for business guidance and professional advice
          </p>
        </div>

        {/* Search and Filters - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500/70 h-4 w-4" />
            <Input
              placeholder="Search consultants by name or specialty..."
              className="pl-10 bg-gray-800 border-amber-500/30 focus:border-amber-400 text-amber-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-[200px] bg-gray-800 border-amber-500/30 focus:border-amber-400 text-amber-100">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-amber-500/30 text-amber-100">
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[200px] bg-gray-800 border-amber-500/30 focus:border-amber-400 text-amber-100">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-amber-500/30 text-amber-100">
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search and Filters - Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500/70 h-4 w-4" />
            <Input
              placeholder="Search consultants..."
              className="pl-10 bg-gray-800 border-amber-500/30 focus:border-amber-400 text-amber-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-gray-800 border-amber-500/30 text-amber-400">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-gray-800 border-l border-amber-500/30 text-amber-100">
              <SheetHeader>
                <SheetTitle className="text-amber-400">Filters</SheetTitle>
                <SheetDescription className="text-amber-100/70">
                  Narrow down consultants by specialty and location
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-amber-300">Specialty</h3>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger className="w-full bg-gray-700 border-amber-500/30 focus:border-amber-400 text-amber-100">
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-amber-500/30 text-amber-100">
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-amber-300">Location</h3>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-full bg-gray-700 border-amber-500/30 focus:border-amber-400 text-amber-100">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-amber-500/30 text-amber-100">
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Results count */}
        <div className="text-sm text-amber-100/70">
          Showing {filteredConsultants.length} consultants
        </div>

        {/* Consultants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredConsultants.map((consultant) => (
            <Card key={consultant.id} className="bg-gray-800 border-amber-500/30 overflow-hidden hover:border-amber-400 transition-all duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src={consultant.image}
                  alt={consultant.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-500 text-gray-900 font-medium">
                    {consultant.hourlyRate}/hr
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-amber-100">{consultant.name}</CardTitle>
                <CardDescription className="text-amber-400 font-medium">
                  {consultant.specialty}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pb-2">
                <div className="flex items-center text-amber-100/70">
                  <MapPin className="h-4 w-4 mr-2 text-amber-500/70" />
                  <span className="text-sm">{consultant.location}</span>
                </div>
                <div className="flex items-center text-amber-100/70">
                  <Briefcase className="h-4 w-4 mr-2 text-amber-500/70" />
                  <span className="text-sm">{consultant.experience}</span>
                </div>
                <div className="flex items-center text-amber-100/70">
                  <Star className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-sm">{consultant.rating} ({consultant.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {consultant.industries.slice(0, 2).map((industry) => (
                    <Badge key={industry} variant="outline" className="bg-gray-700/50 text-amber-300 border-amber-500/30">
                      {industry}
                    </Badge>
                  ))}
                  {consultant.industries.length > 2 && (
                    <Badge variant="outline" className="bg-gray-700/50 text-amber-300 border-amber-500/30">
                      +{consultant.industries.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 hover:from-amber-400 hover:to-orange-500">
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredConsultants.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-amber-400">No consultants found</h3>
            <p className="text-amber-100/70 mt-2">Try adjusting your search or filters</p>
            <Button 
              className="mt-4 bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 hover:from-amber-400 hover:to-orange-500"
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialty("All Specialties");
                setSelectedLocation("All Locations");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
