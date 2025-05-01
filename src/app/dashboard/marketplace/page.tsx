"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Phone, Mail, Filter, Store, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample marketers data
const marketers = [
  {
    id: 1,
    name: "Adama Traore",
    business: "Adama Fabrics & Textiles",
    category: "Textiles & Clothing",
    country: "Mali",
    state: "Bamako",
    market: "Grand Marché",
        image: "/3.jpg",
    products: ["Traditional fabrics", "Handwoven textiles", "Clothing"],
    description: "Specializing in traditional Mali fabrics and textiles with vibrant patterns.",
    phone: "+223 76 54 32 10",
    email: "adama.textiles@example.com",
    established: 2008,
    languages: ["Bambara", "French", "English"],
  },
  {
    id: 2,
    name: "Chioma Okonkwo",
    business: "Chioma's Fresh Produce",
    category: "Food & Agriculture",
    country: "Nigeria",
    state: "Lagos",
    market: "Mile 12 Market",
    image: "/1.avif",
    products: ["Fresh vegetables", "Fruits", "Spices"],
    description: "Supplier of fresh, organic produce sourced from local Nigerian farms.",
    phone: "+234 802 345 6789",
    email: "chioma.produce@example.com",
    established: 2015,
    languages: ["Igbo", "English", "Yoruba"],
  },
  {
    id: 3,
    name: "Kwame Asante",
    business: "Asante Crafts",
    category: "Arts & Crafts",
    country: "Ghana",
    state: "Kumasi",
    market: "Kejetia Market",
    image: "/2.avif",
    products: ["Wood carvings", "Kente cloth", "Handmade jewelry"],
    description: "Authentic Ghanaian crafts made using traditional techniques passed down generations.",
    phone: "+233 24 567 8901",
    email: "asante.crafts@example.com",
    established: 2001,
    languages: ["Twi", "English"],
  },
  {
    id: 4,
    name: "Amina Mohamed",
    business: "Amina's Spice Emporium",
    category: "Food & Agriculture",
    country: "Kenya",
    state: "Mombasa",
    market: "Kongowea Market",
    image: "/4.jpeg",
    products: ["Spices", "Herbs", "Teas"],
    description: "Exotic spices and herbs sourced from across East Africa.",
    phone: "+254 712 345 678",
    email: "amina.spices@example.com",
    established: 2012,
    languages: ["Swahili", "English", "Arabic"],
  },
  {
    id: 5,
    name: "Jean-Baptiste Nkosi",
    business: "Nkosi Minerals",
    category: "Jewelry & Gemstones",
    country: "Democratic Republic of Congo",
    state: "Kinshasa",
    market: "Central Market",
    image: "/5.jpg",
    products: ["Gemstones", "Minerals", "Jewelry"],
    description: "Ethically sourced minerals and gemstones from the rich deposits of the DRC.",
    phone: "+243 991 234 567",
    email: "nkosi.minerals@example.com",
    established: 2010,
    languages: ["French", "Lingala", "Swahili"],
  },
  {
    id: 6,
    name: "Fatima El-Amin",
    business: "Moroccan Treasures",
    category: "Home Goods",
    country: "Morocco",
    state: "Marrakech",
    market: "Jemaa el-Fnaa",
    image: "/6.webp",
    products: ["Rugs", "Pottery", "Lamps", "Leather goods"],
    description: "Authentic Moroccan home decor and artisanal products made by skilled craftspeople.",
    phone: "+212 661 234 567",
    email: "fatima.treasures@example.com",
    established: 2005,
    languages: ["Arabic", "French", "English", "Berber"],
  },
  {
    id: 7,
    name: "Solomon Abebe",
    business: "Ethiopian Coffee House",
    category: "Food & Agriculture",
    country: "Ethiopia",
    state: "Addis Ababa",
    market: "Mercato",
    image: "/7.jpeg",
    products: ["Coffee beans", "Spices", "Traditional coffee sets"],
    description: "Premium Ethiopian coffee beans and traditional coffee ceremony items.",
    phone: "+251 911 234 567",
    email: "solomon.coffee@example.com",
    established: 2009,
    languages: ["Amharic", "English"],
  },
  {
    id: 8,
    name: "Nala Diop",
    business: "Senegalese Fashion",
    category: "Textiles & Clothing",
    country: "Senegal",
    state: "Dakar",
    market: "Sandaga Market",
    image: "8.jpeg",
    products: ["Traditional clothing", "Modern fashion", "Accessories"],
    description: "Contemporary fashion with traditional Senegalese influences and techniques.",
    phone: "+221 77 123 4567",
    email: "nala.fashion@example.com",
    established: 2014,
    languages: ["Wolof", "French", "English"],
  },
  {
    id: 9,
    name: "Ibrahim Toure",
    business: "Sahel Leatherworks",
    category: "Leather Goods",
    country: "Burkina Faso",
    state: "Ouagadougou",
    market: "Grand Marché",
    image: "",
    products: ["Leather bags", "Shoes", "Belts", "Wallets"],
    description: "Handcrafted leather goods using traditional tanning and crafting techniques.",
    phone: "+226 70 12 34 56",
    email: "ibrahim.leather@example.com",
    established: 2007,
    languages: ["Moore", "French", "Dioula"],
  },
  {
    id: 10,
    name: "Grace Mutua",
    business: "Kenyan Beadworks",
    category: "Arts & Crafts",
    country: "Kenya",
    state: "Nairobi",
    market: "Maasai Market",
    image: "",
    products: ["Beaded jewelry", "Decorative items", "Traditional crafts"],
    description: "Colorful beadwork and crafts inspired by Kenyan tribal traditions and designs.",
    phone: "+254 722 123 456",
    email: "grace.beadworks@example.com",
    established: 2011,
    languages: ["Swahili", "English", "Kikuyu"],
  },
  {
    id: 11,
    name: "Kofi Mensah",
    business: "Gold Coast Treasures",
    category: "Jewelry & Gemstones",
    country: "Ghana",
    state: "Accra",
    market: "Makola Market",
    image: "",
    products: ["Gold jewelry", "Traditional adornments", "Ceremonial items"],
    description: "Authentic Ghanaian gold jewelry crafted using traditional techniques.",
    phone: "+233 50 123 4567",
    email: "kofi.gold@example.com",
    established: 2003,
    languages: ["Twi", "English", "Ga"],
  },
  {
    id: 12,
    name: "Zara Abdullahi",
    business: "Sahara Dates & Nuts",
    category: "Food & Agriculture",
    country: "Niger",
    state: "Niamey",
    market: "Grand Marché",
    image: "",
    products: ["Dates", "Nuts", "Dried fruits", "Natural honey"],
    description: "Premium quality dates, nuts, and natural products from the Sahel region.",
    phone: "+227 90 12 34 56",
    email: "zara.dates@example.com",
    established: 2013,
    languages: ["Hausa", "French", "Arabic"],
  },
]

// Filter options
const countries = [
  "All Countries",
  "Mali",
  "Nigeria",
  "Ghana",
  "Kenya",
  "Democratic Republic of Congo",
  "Morocco",
  "Ethiopia",
  "Senegal",
  "Burkina Faso",
  "Niger",
]
const categories = [
  "All Categories",
  "Textiles & Clothing",
  "Food & Agriculture",
  "Arts & Crafts",
  "Jewelry & Gemstones",
  "Home Goods",
  "Leather Goods",
]

// Get unique states based on selected country
interface StateFilterParams {
    country: string
}

const getStates = (country: StateFilterParams["country"]): string[] => {
    if (country === "All Countries") return ["All States"]

    const states: string[] = marketers.filter((m) => m.country === country).map((m) => m.state)

    return ["All States", ...new Set(states)]
}

// Get unique markets based on selected state
interface MarketFilterParams {
    country: string
    state: string
}

const getMarkets = (country: MarketFilterParams["country"], state: MarketFilterParams["state"]): string[] => {
    if (country === "All Countries" || state === "All States") return ["All Markets"]

    const markets: string[] = marketers.filter((m) => m.country === country && m.state === state).map((m) => m.market)

    return ["All Markets", ...new Set(markets)]
}

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedMarket, setSelectedMarket] = useState("All Markets")
  const [states, setStates] = useState(["All States"])
  const [markets, setMarkets] = useState(["All Markets"])

  // Update states when country changes
const handleCountryChange = (country: string): void => {
    setSelectedCountry(country)
    const newStates: string[] = getStates(country)
    setStates(newStates)
    setSelectedState("All States")
    setSelectedMarket("All Markets")
}

  // Update markets when state changes
interface Marketer {
    id: number
    name: string
    business: string
    category: string
    country: string
    state: string
    market: string
    image: string
    products: string[]
    description: string
    phone: string
    email: string
    established: number
    languages: string[]
}

interface FilterOptions {
    countries: string[]
    categories: string[]
}

const handleStateChange = (state: string): void => {
    setSelectedState(state)
    const newMarkets: string[] = getMarkets(selectedCountry, state)
    setMarkets(newMarkets)
    setSelectedMarket("All Markets")
}

  // Filter marketers based on search and filters
  const filteredMarketers = marketers.filter((marketer) => {
    const matchesSearch =
      marketer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      marketer.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      marketer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      marketer.products.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All Categories" || marketer.category === selectedCategory

    const matchesCountry = selectedCountry === "All Countries" || marketer.country === selectedCountry

    const matchesState = selectedState === "All States" || marketer.state === selectedState

    const matchesMarket = selectedMarket === "All Markets" || marketer.market === selectedMarket

    return matchesSearch && matchesCategory && matchesCountry && matchesState && matchesMarket
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
            African Marketplace
          </h1>
          <p className="text-amber-100/70">Discover authentic products and connect with marketers across Africa</p>
        </div>

        {/* Tabs for Categories */}
        <Tabs defaultValue="All Categories" className="w-full" onValueChange={setSelectedCategory}>
          <TabsList className="bg-gray-800 border border-amber-500/30 p-1 overflow-x-auto flex w-full justify-start">
            <TabsTrigger
              value="All Categories"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-gray-900"
            >
              All
            </TabsTrigger>
            {categories.slice(1).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-gray-900"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Search and Filters - Desktop */}
        <div className="hidden md:grid grid-cols-4 gap-4">
          <div className="relative col-span-4 md:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500/70 h-4 w-4" />
            <Input
              placeholder="Search marketers or products..."
              className="pl-10 bg-gray-800 border-amber-500/30 focus:border-amber-400 text-amber-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedCountry} onValueChange={handleCountryChange}>
            <SelectTrigger className="bg-gray-800 border-amber-500/30 focus:border-amber-400 text-amber-100">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-amber-500/30 text-amber-100">
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedState} onValueChange={handleStateChange}>
            <SelectTrigger className="bg-gray-800 border-amber-500/30 focus:border-amber-400 text-amber-100">
              <SelectValue placeholder="State/Region" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-amber-500/30 text-amber-100">
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMarket} onValueChange={setSelectedMarket}>
            <SelectTrigger className="bg-gray-800 border-amber-500/30 focus:border-amber-400 text-amber-100">
              <SelectValue placeholder="Market" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-amber-500/30 text-amber-100">
              {markets.map((market) => (
                <SelectItem key={market} value={market}>
                  {market}
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
              placeholder="Search marketers..."
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
                  Filter marketers by location and category
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-amber-300">Category</h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full bg-gray-700 border-amber-500/30 focus:border-amber-400 text-amber-100">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-amber-500/30 text-amber-100">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-amber-300">Country</h3>
                  <Select value={selectedCountry} onValueChange={handleCountryChange}>
                    <SelectTrigger className="w-full bg-gray-700 border-amber-500/30 focus:border-amber-400 text-amber-100">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-amber-500/30 text-amber-100">
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-amber-300">State/Region</h3>
                  <Select value={selectedState} onValueChange={handleStateChange}>
                    <SelectTrigger className="w-full bg-gray-700 border-amber-500/30 focus:border-amber-400 text-amber-100">
                      <SelectValue placeholder="State/Region" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-amber-500/30 text-amber-100">
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-amber-300">Market</h3>
                  <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                    <SelectTrigger className="w-full bg-gray-700 border-amber-500/30 focus:border-amber-400 text-amber-100">
                      <SelectValue placeholder="Market" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-amber-500/30 text-amber-100">
                      {markets.map((market) => (
                        <SelectItem key={market} value={market}>
                          {market}
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
        <div className="text-sm text-amber-100/70">Showing {filteredMarketers.length} marketers</div>

        {/* Marketers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMarketers.map((marketer) => (
            <Card
              key={marketer.id}
              className="bg-gray-800 border-amber-500/30 overflow-hidden hover:border-amber-400 transition-all duration-300"
            >
              <div className="relative h-48 w-full">
                <Image src={marketer.image || "/placeholder.svg"} alt={marketer.name} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-500 text-gray-900 font-medium">{marketer.category}</Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-amber-100">{marketer.business}</CardTitle>
                <CardDescription className="text-amber-400 font-medium">{marketer.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pb-2">
                <div className="flex items-center text-amber-100/70">
                  <MapPin className="h-4 w-4 mr-2 text-amber-500/70" />
                  <span className="text-sm">
                    {marketer.market}, {marketer.state}, {marketer.country}
                  </span>
                </div>
                <div className="flex items-center text-amber-100/70">
                  <Store className="h-4 w-4 mr-2 text-amber-500/70" />
                  <span className="text-sm">Est. {marketer.established}</span>
                </div>
                <div className="flex items-center text-amber-100/70">
                  <ShoppingBag className="h-4 w-4 mr-2 text-amber-500/70" />
                  <span className="text-sm">
                    {marketer.products.slice(0, 3).join(", ")}
                    {marketer.products.length > 3 ? "..." : ""}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {marketer.languages.slice(0, 2).map((language) => (
                    <Badge
                      key={language}
                      variant="outline"
                      className="bg-gray-700/50 text-amber-300 border-amber-500/30"
                    >
                      {language}
                    </Badge>
                  ))}
                  {marketer.languages.length > 2 && (
                    <Badge variant="outline" className="bg-gray-700/50 text-amber-300 border-amber-500/30">
                      +{marketer.languages.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 hover:from-amber-400 hover:to-orange-500">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredMarketers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-amber-400">No marketers found</h3>
            <p className="text-amber-100/70 mt-2">Try adjusting your search or filters</p>
            <Button
              className="mt-4 bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 hover:from-amber-400 hover:to-orange-500"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All Categories")
                setSelectedCountry("All Countries")
                setSelectedState("All States")
                setSelectedMarket("All Markets")
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
