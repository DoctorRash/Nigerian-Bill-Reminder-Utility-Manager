"use client"

import { useState } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Mock data for bills with due dates
const bills = [
  { id: 1, name: "NEPA Electricity", amount: "₦10,000", dueDate: new Date(2025, 4, 18), category: "Utility" },
  { id: 2, name: "DSTV Subscription", amount: "₦15,000", dueDate: new Date(2025, 4, 22), category: "Entertainment" },
  { id: 3, name: "Rent Payment", amount: "₦250,000", dueDate: new Date(2025, 4, 30), category: "Housing" },
  { id: 4, name: "Internet Subscription", amount: "₦25,000", dueDate: new Date(2025, 5, 5), category: "Utility" },
  { id: 5, name: "Water Bill", amount: "₦5,000", dueDate: new Date(2025, 5, 2), category: "Utility" },
  { id: 6, name: "School Fees", amount: "₦150,000", dueDate: new Date(2025, 7, 15), category: "Education" },
]

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Get days in current month
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const startDay = getDay(monthStart)

  // Get bills for selected date
  const selectedDateBills = selectedDate ? bills.filter((bill) => isSameDay(bill.dueDate, selectedDate)) : []

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
    setSelectedDate(null)
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
    setSelectedDate(null)
  }

  // Check if a date has bills
  const hasBills = (date: Date) => {
    return bills.some((bill) => isSameDay(bill.dueDate, date))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Calendar View</h2>
        <p className="text-muted-foreground">View your bill due dates on a monthly calendar.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Bill Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">{format(currentMonth, "MMMM yyyy")}</div>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center font-medium">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty cells for days before the first day of month */}
            {Array.from({ length: startDay }).map((_, index) => (
              <div key={`empty-${index}`} className="p-2"></div>
            ))}

            {/* Calendar days */}
            {daysInMonth.map((day) => {
              const hasEvents = hasBills(day)
              const isSelected = selectedDate && isSameDay(day, selectedDate)

              return (
                <div
                  key={day.toString()}
                  className={`relative p-2 h-16 border rounded-md cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : hasEvents
                        ? "hover:bg-muted"
                        : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="text-right">{format(day, "d")}</div>
                  {hasEvents && !isSelected && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></div>
                  )}
                  {hasEvents && (
                    <div className="mt-1 text-xs truncate">
                      {bills.filter((bill) => isSameDay(bill.dueDate, day)).length} bills
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>Bills Due on {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
            <CardDescription>
              {selectedDateBills.length > 0
                ? `You have ${selectedDateBills.length} bill(s) due on this date.`
                : "No bills due on this date."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateBills.length > 0 ? (
              <div className="space-y-4">
                {selectedDateBills.map((bill) => (
                  <div key={bill.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{bill.name}</div>
                      <div className="text-sm text-muted-foreground">{bill.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{bill.amount}</div>
                      <Button size="sm" variant="outline" className="mt-1">
                        Mark as Paid
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No bills due on this date. Select a date with bills to view details.
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
