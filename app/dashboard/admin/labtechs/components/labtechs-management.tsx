"use client"

import type React from "react"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search } from "lucide-react"
import useSWR, { mutate } from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function LabTechsManagement() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({ name: "", phone: "", labName: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data, isLoading } = useSWR("/api/admin/labtechs", fetcher)
  const labTechs = data?.labTechs || []

  const filteredLabTechs = labTechs.filter(
    (tech: any) =>
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.phone.includes(searchTerm) ||
      tech.labName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/admin/labtechs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        mutate("/api/admin/labtechs")
        setFormData({ name: "", phone: "", labName: "" })
        setIsOpen(false)
      }
    } catch (error) {
      console.error("Error creating lab tech:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleStatus = async (labTechId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE"
    try {
      await fetch(`/api/admin/labtechs/${labTechId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      mutate("/api/admin/labtechs")
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.admin.manageLabTechs}</h1>
          <p className="text-muted-foreground">Create and manage lab technicians</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t.admin.createLabTech}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.admin.createLabTech}</DialogTitle>
              <DialogDescription>Add a new lab technician to the system</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.form.name}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.form.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="labName">{t.form.labName}</Label>
                  <Input
                    id="labName"
                    value={formData.labName}
                    onChange={(e) => setFormData({ ...formData, labName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  {t.common.cancel}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? t.common.loading : t.common.save}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Lab Technicians</CardTitle>
          <CardDescription>{labTechs.length} lab technicians registered</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or lab name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {isLoading ? (
            <p className="text-muted-foreground">{t.common.loading}</p>
          ) : filteredLabTechs.length === 0 ? (
            <p className="text-muted-foreground">{t.dashboard.noData}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.form.name}</TableHead>
                  <TableHead>{t.form.phone}</TableHead>
                  <TableHead>{t.form.labName}</TableHead>
                  <TableHead>{t.common.status}</TableHead>
                  <TableHead>{t.common.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLabTechs.map((tech: any) => (
                  <TableRow key={tech._id}>
                    <TableCell className="font-medium">{tech.name}</TableCell>
                    <TableCell>{tech.phone}</TableCell>
                    <TableCell>{tech.labName}</TableCell>
                    <TableCell>
                      <Badge variant={tech.status === "ACTIVE" ? "default" : "secondary"}>
                        {tech.status === "ACTIVE" ? t.common.active : t.common.inactive}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => toggleStatus(tech._id, tech.status)}>
                        {tech.status === "ACTIVE" ? "Deactivate" : "Activate"}
                      </Button>
                    </TableCell>
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
