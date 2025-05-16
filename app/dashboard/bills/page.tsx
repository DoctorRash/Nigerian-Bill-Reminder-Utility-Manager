"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search } from "lucide-react"

// Mock data for bills
const allBills = [
  {
    id: 1,
    name: "NEPA Electricity",
    amount: "₦10,000",
    dueDate: "May 18, 2025",
    status: "Due Soon",
    category: "Utility",
    frequency: "Monthly",
  },
  {
    id: 2,
    name: "DSTV Subscription",
    amount: "₦15,000",
    dueDate: "May 22, 2025",
    status: "Upcoming",
    category: "Entertainment",
    frequency: "Monthly",
  },
  {
    id: 3,
    name: "Rent Payment",
    amount: "₦250,000",
    dueDate: "May 30, 2025",
    status: "Upcoming",
    category: "Housing",
    frequency: "Yearly",
  },
  {
    id: 4,
    name: "Internet Subscription",
    amount: "₦25,000",
    dueDate: "June 5, 2025",
    status: "Upcoming",
    category: "Utility",
    frequency: "Monthly",
  },
  {
    id: 5,
    name: "Water Bill",
    amount: "₦5,000",
    dueDate: "June 2, 2025",
    status: "Upcoming",
    category: "Utility",
    frequency: "Monthly",
  },
  {
    id: 6,
    name: "School Fees",
    amount: "₦150,000",
    dueDate: "August 15, 2025",
    status: "Upcoming",
    category: "Education",
    frequency: "Quarterly",
  },
]

const paidBills = [
  {
    id: 7,
    name: "Internet Subscription",
    amount: "₦25,000",
    paidDate: "May 5, 2025",
    category: "Utility",
    frequency: "Monthly",
  },
  { id: 8, name: "Water Bill", amount: "₦5,000", paidDate: "May 2, 2025", category: "Utility", frequency: "Monthly" },
  {
    id: 9,
    name: "NEPA Electricity",
    amount: "₦10,000",
    paidDate: "April 18, 2025",
    category: "Utility",
    frequency: "Monthly",
  },
  {
    id: 10,
    name: "DSTV Subscription",
    amount: "₦15,000",
    paidDate: "April 22, 2025",
    category: "Entertainment",
    frequency: "Monthly",
  },
]

export default function BillsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Filter bills based on search term and category
  const filteredBills = allBills.filter((bill) => {
    const matchesSearch = bill.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || bill.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const filteredPaidBills = paidBills.filter((bill) => {
    const matchesSearch = bill.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || bill.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Bills</h2>
          <p className="text-muted-foreground">View and manage all your bills in one place.</p>
        </div>
        <Link href="/dashboard/add-bill">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Bill
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Bills Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                placeholder="Search bills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                type="search"
              />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="utility">Utility</SelectItem>
                <SelectItem value="housing">Housing</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Bills</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bill Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBills.length > 0 ? (
                      filteredBills.map((bill) => (
                        <TableRow key={bill.id}>
                          <TableCell className="font-medium">{bill.name}</TableCell>
                          <TableCell>{bill.amount}</TableCell>
                          <TableCell>{bill.dueDate}</TableCell>
                          <TableCell>{bill.category}</TableCell>
                          <TableCell>{bill.frequency}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                bill.status === "Due Soon"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {bill.status}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                Mark as Paid
                              </Button>
                              <Button size="sm">View</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No bills found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="history">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bill Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Paid Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPaidBills.length > 0 ? (
                      filteredPaidBills.map((bill) => (
                        <TableRow key={bill.id}>
                          <TableCell className="font-medium">{bill.name}</TableCell>
                          <TableCell>{bill.amount}</TableCell>
                          <TableCell>{bill.paidDate}</TableCell>
                          <TableCell>{bill.category}</TableCell>
                          <TableCell>{bill.frequency}</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No payment history found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
