"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/config"
import type { Farmer } from "@/lib/types"
import { Loader2, User, UserPlus, Search } from "lucide-react"

interface CreateOrderFormProps {
  agentId: string
  existingFarmers: Farmer[]
  pricePerAcre: number
}

type FarmerMode = "existing" | "new" | "search"

export function CreateOrderForm({ agentId, existingFarmers, pricePerAcre }: CreateOrderFormProps) {
  const { t } = useI18n()
  const { toast } = useToast()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [farmerMode, setFarmerMode] = useState<FarmerMode>("new")
  const [selectedFarmerId, setSelectedFarmerId] = useState<string>("")
  const [searchPhone, setSearchPhone] = useState("")
  const [searchedFarmer, setSearchedFarmer] = useState<Farmer | null>(null)
  const [acres, setAcres] = useState<number>(1)

  const totalAmount = acres * pricePerAcre

  const handleSearchFarmer = async () => {
    if (!searchPhone || searchPhone.length !== 10) {
      toast({
        title: t.common.error,
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      })
      return
    }

    try {
      const res = await fetch(`/api/farmers/search?phone=${searchPhone}`)
      if (res.ok) {
        const farmer = await res.json()
        setSearchedFarmer(farmer)
      } else {
        setSearchedFarmer(null)
        toast({
          title: "Not Found",
          description: "No farmer found with this phone number. Please create a new farmer.",
        })
      }
    } catch {
      toast({
        title: t.common.error,
        description: "Failed to search farmer",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    let farmerId: string | null = null

    // Determine farmer ID based on mode
    if (farmerMode === "existing" && selectedFarmerId) {
      farmerId = selectedFarmerId
    } else if (farmerMode === "search" && searchedFarmer) {
      farmerId = searchedFarmer._id!
    } else if (farmerMode === "new") {
      // Create new farmer first
      try {
        const farmerData = {
          name: formData.get("farmerName") as string,
          phone: formData.get("farmerPhone") as string,
          address: {
            village: formData.get("village") as string,
            district: formData.get("district") as string,
            state: formData.get("state") as string,
          },
          createdByAgentId: agentId,
        }

        const farmerRes = await fetch("/api/farmers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(farmerData),
        })

        if (farmerRes.ok) {
          const newFarmer = await farmerRes.json()
          farmerId = newFarmer._id
        } else {
          throw new Error("Failed to create farmer")
        }
      } catch {
        toast({
          title: t.common.error,
          description: "Failed to create farmer",
          variant: "destructive",
        })
        setLoading(false)
        return
      }
    }

    if (!farmerId) {
      toast({
        title: t.common.error,
        description: "Please select or create a farmer",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Create the order
    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmerId,
          agentId,
          acres,
        }),
      })

      if (orderRes.ok) {
        const order = await orderRes.json()
        toast({
          title: t.common.success,
          description: "Order created successfully",
        })
        router.push(`/dashboard/agent/orders/${order._id}/payment`)
      } else {
        throw new Error("Failed to create order")
      }
    } catch {
      toast({
        title: t.common.error,
        description: "Failed to create order",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t.agent.createOrder}</h1>
        <p className="text-muted-foreground">Create a new soil test order for a farmer</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Farmer Selection */}
        <Card>
          <CardHeader>
            <CardTitle>{t.agent.farmerDetails}</CardTitle>
            <CardDescription>Select an existing farmer or create a new one</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={farmerMode}
              onValueChange={(v) => setFarmerMode(v as FarmerMode)}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem value="new" id="new" className="peer sr-only" />
                <Label
                  htmlFor="new"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <UserPlus className="mb-2 h-6 w-6" />
                  <span className="text-sm">{t.agent.createNewFarmer}</span>
                </Label>
              </div>
              {existingFarmers.length > 0 && (
                <div>
                  <RadioGroupItem value="existing" id="existing" className="peer sr-only" />
                  <Label
                    htmlFor="existing"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <User className="mb-2 h-6 w-6" />
                    <span className="text-sm">My Farmers</span>
                  </Label>
                </div>
              )}
              <div>
                <RadioGroupItem value="search" id="search" className="peer sr-only" />
                <Label
                  htmlFor="search"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Search className="mb-2 h-6 w-6" />
                  <span className="text-sm">{t.agent.searchFarmer}</span>
                </Label>
              </div>
            </RadioGroup>

            {/* Existing Farmer Dropdown */}
            {farmerMode === "existing" && existingFarmers.length > 0 && (
              <div className="space-y-2">
                <Label>Select Farmer</Label>
                <Select value={selectedFarmerId} onValueChange={setSelectedFarmerId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a farmer" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingFarmers.map((farmer) => (
                      <SelectItem key={farmer._id} value={farmer._id!}>
                        {farmer.name} - {farmer.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Search by Phone */}
            {farmerMode === "search" && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="tel"
                    placeholder="Enter 10-digit phone number"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                    maxLength={10}
                  />
                  <Button type="button" variant="secondary" onClick={handleSearchFarmer}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                {searchedFarmer && (
                  <div className="p-4 bg-accent rounded-lg">
                    <p className="font-medium">{searchedFarmer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {searchedFarmer.address.village}, {searchedFarmer.address.district}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* New Farmer Form */}
            {farmerMode === "new" && (
              <div className="space-y-4 pt-4 border-t">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="farmerName">{t.form.name} *</Label>
                    <Input id="farmerName" name="farmerName" required placeholder="Farmer's name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmerPhone">{t.form.phone} *</Label>
                    <Input
                      id="farmerPhone"
                      name="farmerPhone"
                      type="tel"
                      required
                      placeholder="9876543210"
                      maxLength={10}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="village">{t.form.village} *</Label>
                    <Input id="village" name="village" required placeholder="Village" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">{t.form.district} *</Label>
                    <Input id="district" name="district" required placeholder="District" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">{t.form.state} *</Label>
                    <Input id="state" name="state" required placeholder="State" defaultValue="Madhya Pradesh" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Land Details */}
        <Card>
          <CardHeader>
            <CardTitle>{t.agent.landDetails}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="acres">{t.form.acres} *</Label>
              <Input
                id="acres"
                name="acres"
                type="number"
                min="0.5"
                step="0.5"
                value={acres}
                onChange={(e) => setAcres(Number(e.target.value))}
                required
              />
              <p className="text-sm text-muted-foreground">Price: {formatCurrency(pricePerAcre)} per acre</p>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="bg-accent">
          <CardHeader>
            <CardTitle>{t.agent.orderSummary}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  {acres} acre(s) × {formatCurrency(pricePerAcre)}
                </p>
                <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
              </div>
              <Button type="submit" size="lg" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.agent.proceedToPayment}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
