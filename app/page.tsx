import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">BillTracker</span>
            <span className="text-green-600">NG</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Never Miss a Bill Payment Again
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Track your NEPA, DSTV, rent, school fees, and other bills in one place. Get timely reminders and
                    avoid penalties or disconnection.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard/demo">
                    <Button size="lg" variant="outline">
                      Try Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mr-0 relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-xl blur-xl opacity-50"></div>
                  <div className="relative bg-white dark:bg-gray-950 border rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-lg">Upcoming Bills</h3>
                          <span className="text-sm text-muted-foreground">May 2025</span>
                        </div>
                        <div className="space-y-3">
                          {[
                            { name: "NEPA Electricity", amount: "₦10,000", date: "May 18", status: "Due Soon" },
                            { name: "DSTV Subscription", amount: "₦15,000", date: "May 22", status: "Upcoming" },
                            { name: "Rent Payment", amount: "₦250,000", date: "May 30", status: "Upcoming" },
                          ].map((bill) => (
                            <div key={bill.name} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex flex-col">
                                <span className="font-medium">{bill.name}</span>
                                <span className="text-sm text-muted-foreground">{bill.date}</span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="font-semibold">{bill.amount}</span>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${
                                    bill.status === "Due Soon"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {bill.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your bills efficiently
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              {[
                {
                  title: "Bill Tracking",
                  description: "Add and track all your recurring and one-off bills in one place.",
                  icon: "📝",
                },
                {
                  title: "Reminder Notifications",
                  description: "Get email alerts 1-2 days before your bills are due.",
                  icon: "🔔",
                },
                {
                  title: "Calendar View",
                  description: "Visualize your bill due dates on a monthly calendar.",
                  icon: "📅",
                },
                {
                  title: "Bill History",
                  description: "Keep track of your payment history for all bills.",
                  icon: "📊",
                },
                {
                  title: "Search & Filter",
                  description: "Easily find specific bills with powerful search and filter options.",
                  icon: "🔍",
                },
                {
                  title: "Secure Access",
                  description: "Your data is protected with secure authentication.",
                  icon: "🔒",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center space-y-2 border rounded-xl p-6 shadow-sm"
                >
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-8 md:text-left">
          <p className="text-sm text-muted-foreground">© 2025 BillTracker NG. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
