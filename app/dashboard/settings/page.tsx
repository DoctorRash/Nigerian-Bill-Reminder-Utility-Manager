"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const notificationFormSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  reminderDays: z.string(),
})

const preferencesFormSchema = z.object({
  currency: z.string(),
  theme: z.string(),
  language: z.string(),
})

export default function SettingsPage() {
  const [isNotificationLoading, setIsNotificationLoading] = useState(false)
  const [isPreferencesLoading, setIsPreferencesLoading] = useState(false)

  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      reminderDays: "2",
    },
  })

  const preferencesForm = useForm<z.infer<typeof preferencesFormSchema>>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      currency: "ngn",
      theme: "light",
      language: "en",
    },
  })

  function onNotificationSubmit(values: z.infer<typeof notificationFormSchema>) {
    setIsNotificationLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsNotificationLoading(false)
      toast({
        title: "Notification settings updated!",
        description: "Your notification preferences have been saved.",
      })
    }, 1500)
  }

  function onPreferencesSubmit(values: z.infer<typeof preferencesFormSchema>) {
    setIsPreferencesLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsPreferencesLoading(false)
      toast({
        title: "Preferences updated!",
        description: "Your application preferences have been saved.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your application settings and preferences.</p>
      </div>
      <Separator />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure how and when you receive notifications about your bills.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...notificationForm}>
              <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                <FormField
                  control={notificationForm.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Email Notifications</FormLabel>
                        <FormDescription>Receive bill reminders and updates via email.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={notificationForm.control}
                  name="smsNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">SMS Notifications</FormLabel>
                        <FormDescription>Receive bill reminders and updates via SMS.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={notificationForm.control}
                  name="reminderDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Reminder Days</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select days before due date" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 day before</SelectItem>
                          <SelectItem value="2">2 days before</SelectItem>
                          <SelectItem value="3">3 days before</SelectItem>
                          <SelectItem value="5">5 days before</SelectItem>
                          <SelectItem value="7">7 days before</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Default number of days before due date to send reminders.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isNotificationLoading}>
                  {isNotificationLoading ? "Saving..." : "Save Notification Settings"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Preferences</CardTitle>
            <CardDescription>Customize your application experience.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...preferencesForm}>
              <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
                <FormField
                  control={preferencesForm.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ngn">Nigerian Naira (₦)</SelectItem>
                          <SelectItem value="usd">US Dollar ($)</SelectItem>
                          <SelectItem value="eur">Euro (€)</SelectItem>
                          <SelectItem value="gbp">British Pound (£)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The currency used to display bill amounts.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={preferencesForm.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Theme</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose the application theme.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={preferencesForm.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="yo">Yoruba</SelectItem>
                          <SelectItem value="ha">Hausa</SelectItem>
                          <SelectItem value="ig">Igbo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose your preferred language.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPreferencesLoading}>
                  {isPreferencesLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
