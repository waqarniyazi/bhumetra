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

export function AgentsManagement() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({ name: "", phone: "", region: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data, isLoading } = useSWR("/api/admin/agents", fetcher)
  const agents = data?.agents || []

  const filteredAgents = agents.filter(
    (agent: any) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.phone.includes(searchTerm) ||
      agent.region.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/admin/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        mutate("/api/admin/agents")
        setFormData({ name: "", phone: "", region: "" })
        setIsOpen(false)
      }
    } catch (error) {
      console.error("Error creating agent:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleStatus = async (agentId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE"
    try {
      await fetch(`/api/admin/agents/${agentId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      mutate("/api/admin/agents")
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.admin.manageAgents}</h1>
          <p className="text-muted-foreground">Create and manage field agents</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t.admin.createAgent}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.admin.createAgent}</DialogTitle>
              <DialogDescription>Add a new field agent to the system</DialogDescription>
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
                  <Label htmlFor="region">{t.form.region}</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    placeholder="District, State"
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
          <CardTitle>All Agents</CardTitle>
          <CardDescription>{agents.length} agents registered</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {isLoading ? (
            <p className="text-muted-foreground">{t.common.loading}</p>
          ) : filteredAgents.length === 0 ? (
            <p className="text-muted-foreground">{t.dashboard.noData}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.form.name}</TableHead>
                  <TableHead>{t.form.phone}</TableHead>
                  <TableHead>{t.form.region}</TableHead>
                  <TableHead>{t.common.status}</TableHead>
                  <TableHead>{t.common.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent: any) => (
                  <TableRow key={agent._id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>{agent.phone}</TableCell>
                    <TableCell>{agent.region}</TableCell>
                    <TableCell>
                      <Badge variant={agent.status === "ACTIVE" ? "default" : "secondary"}>
                        {agent.status === "ACTIVE" ? t.common.active : t.common.inactive}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => toggleStatus(agent._id, agent.status)}>
                        {agent.status === "ACTIVE" ? "Deactivate" : "Activate"}
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
