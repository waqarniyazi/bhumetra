"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function FarmersManagement() {
  const { t } = useI18n()
  const [searchTerm, setSearchTerm] = useState("")

  const { data, isLoading } = useSWR("/api/admin/farmers", fetcher)
  const farmers = data?.farmers || []

  const filteredFarmers = farmers.filter(
    (farmer: any) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.phone.includes(searchTerm) ||
      farmer.address?.village?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.address?.district?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t.admin.manageFarmers}</h1>
        <p className="text-muted-foreground">View all registered farmers (read-only)</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Farmers</CardTitle>
          <CardDescription>{farmers.length} farmers registered</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, village, or district..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {isLoading ? (
            <p className="text-muted-foreground">{t.common.loading}</p>
          ) : filteredFarmers.length === 0 ? (
            <p className="text-muted-foreground">{t.dashboard.noData}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.form.name}</TableHead>
                  <TableHead>{t.form.phone}</TableHead>
                  <TableHead>{t.form.village}</TableHead>
                  <TableHead>{t.form.district}</TableHead>
                  <TableHead>{t.form.acres}</TableHead>
                  <TableHead>Registered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFarmers.map((farmer: any) => (
                  <TableRow key={farmer._id}>
                    <TableCell className="font-medium">{farmer.name}</TableCell>
                    <TableCell>{farmer.phone}</TableCell>
                    <TableCell>{farmer.address?.village || "-"}</TableCell>
                    <TableCell>{farmer.address?.district || "-"}</TableCell>
                    <TableCell>{farmer.landSizeInAcres || "-"}</TableCell>
                    <TableCell>{new Date(farmer.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
