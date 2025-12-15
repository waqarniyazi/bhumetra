"use client"
import { useI18n } from "@/lib/i18n/context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useSWR, { mutate } from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function LeadsManagement() {
  const { t } = useI18n()

  const { data: leadsData, isLoading: leadsLoading } = useSWR("/api/admin/leads", fetcher)
  const { data: messagesData, isLoading: messagesLoading } = useSWR("/api/admin/contacts", fetcher)

  const leads = leadsData?.leads || []
  const messages = messagesData?.messages || []

  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      await fetch(`/api/admin/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      mutate("/api/admin/leads")
    } catch (error) {
      console.error("Error updating lead status:", error)
    }
  }

  const markMessageRead = async (messageId: string) => {
    try {
      await fetch(`/api/admin/contacts/${messageId}/read`, {
        method: "PATCH",
      })
      mutate("/api/admin/contacts")
    } catch (error) {
      console.error("Error marking message read:", error)
    }
  }

  const getLeadStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "outline"; label: string }> = {
      NEW: { variant: "default", label: "New" },
      CONTACTED: { variant: "secondary", label: "Contacted" },
      CONVERTED: { variant: "outline", label: "Converted" },
    }
    const config = statusMap[status] || { variant: "outline", label: status }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t.admin.leadsContacts}</h1>
        <p className="text-muted-foreground">Manage leads from landing page and contact messages</p>
      </div>

      <Tabs defaultValue="leads">
        <TabsList>
          <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
          <TabsTrigger value="contacts">Contact Messages ({messages.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Landing Page Leads</CardTitle>
              <CardDescription>Farmers who filled the lead form</CardDescription>
            </CardHeader>
            <CardContent>
              {leadsLoading ? (
                <p className="text-muted-foreground">{t.common.loading}</p>
              ) : leads.length === 0 ? (
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
                      <TableHead>{t.common.status}</TableHead>
                      <TableHead>{t.common.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead: any) => (
                      <TableRow key={lead._id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.phone}</TableCell>
                        <TableCell>{lead.village || "-"}</TableCell>
                        <TableCell>{lead.district || "-"}</TableCell>
                        <TableCell>{lead.acres || "-"}</TableCell>
                        <TableCell>{getLeadStatusBadge(lead.status)}</TableCell>
                        <TableCell>
                          <Select value={lead.status} onValueChange={(value) => updateLeadStatus(lead._id, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="NEW">New</SelectItem>
                              <SelectItem value="CONTACTED">Contacted</SelectItem>
                              <SelectItem value="CONVERTED">Converted</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form Messages</CardTitle>
              <CardDescription>Messages from the contact page</CardDescription>
            </CardHeader>
            <CardContent>
              {messagesLoading ? (
                <p className="text-muted-foreground">{t.common.loading}</p>
              ) : messages.length === 0 ? (
                <p className="text-muted-foreground">{t.dashboard.noData}</p>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg: any) => (
                    <div
                      key={msg._id}
                      className={`rounded-lg border p-4 ${msg.isRead ? "bg-background" : "bg-muted/50"}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{msg.name}</p>
                            {!msg.isRead && <Badge variant="default">New</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {msg.phone && `${msg.phone} • `}
                            {msg.email && `${msg.email} • `}
                            {new Date(msg.createdAt).toLocaleString()}
                          </p>
                        </div>
                        {!msg.isRead && (
                          <Button size="sm" variant="outline" onClick={() => markMessageRead(msg._id)}>
                            Mark Read
                          </Button>
                        )}
                      </div>
                      <p className="mt-3 text-muted-foreground">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
