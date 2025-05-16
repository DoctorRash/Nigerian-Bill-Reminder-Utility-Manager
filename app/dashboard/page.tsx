import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowRight, Bell, CalendarDays, Plus, CreditCard } from "lucide-react"

export default function DashboardPage() {
  // Mock data for bills
  const upcomingBills = [
    {
      id: 1,
      name: "NEPA Electricity",
      amount: "₦10,000",
      dueDate: "May 18, 2025",
      status: "Due Soon",
      type: "Utility",
    },
    {
      id: 2,
      name: "DSTV Subscription",
      amount: "₦15,000",
      dueDate: "May 22, 2025",
      status: "Upcoming",
      type: "Entertainment",
    },
    { id: 3, name: "Rent Payment", amount: "₦250,000", dueDate: "May 30, 2025", status: "Upcoming", type: "Housing" },
  ]

  const recentlyPaidBills = [
    { id: 4, name: "Internet Subscription", amount: "₦25,000", paidDate: "May 5, 2025", type: "Utility" },
    { id: 5, name: "Water Bill", amount: "₦5,000", paidDate: "May 2, 2025", type: "Utility" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Manage your bills and stay on top of your payments.</p>
        </div>
        <Link href="/dashboard/add-bill">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Bill
          </Button>
        </Link>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Reminder!</AlertTitle>
        <AlertDescription>
          You have 1 bill due in the next 3 days. Make sure to pay on time to avoid penalties.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Active bills in your account</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Month</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦275,000</div>
            <p className="text-xs text-muted-foreground">Total amount due in May</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Bills</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Bills due in the next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">₦</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦30,000</div>
            <p className="text-xs text-muted-foreground">Total paid in May</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Bills</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingBills.map((bill) => (
              <Card key={bill.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{bill.name}</CardTitle>
                    <div
                      className={`px-2 py-1 text-xs rounded-full ${
                        bill.status === "Due Soon" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {bill.status}
                    </div>
                  </div>
                  <CardDescription>{bill.type}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Amount</p>
                      <p className="text-xl font-bold">{bill.amount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Due Date</p>
                      <p className="text-sm">{bill.dueDate}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Mark as Paid
                  </Button>
                  <Button size="sm">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/dashboard/bills">
              <Button variant="outline" className="gap-1">
                View All Bills <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-4 gap-4 p-4 font-medium">
              <div>Bill Name</div>
              <div>Amount</div>
              <div>Paid Date</div>
              <div>Category</div>
            </div>
            {recentlyPaidBills.map((bill) => (
              <div key={bill.id} className="grid grid-cols-4 gap-4 border-t p-4">
                <div>{bill.name}</div>
                <div>{bill.amount}</div>
                <div>{bill.paidDate}</div>
                <div>{bill.type}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/dashboard/bills?tab=history">
              <Button variant="outline" className="gap-1">
                View Full History <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
