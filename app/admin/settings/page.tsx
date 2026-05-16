"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Zap, 
  Mail, 
  Smartphone,
  CheckCircle,
  Save
} from "lucide-react"

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("Settings saved successfully!")
    }, 1000)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and platform configurations</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="general" className="gap-2"><SettingsIcon className="h-4 w-4" /> General</TabsTrigger>
          <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" /> Alerts</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="h-4 w-4" /> Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Configuration</CardTitle>
              <CardDescription>Global settings for the Creative Edge competition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Voting Active</Label>
                  <p className="text-xs text-muted-foreground">Enable or disable voting for all users</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Registration</Label>
                  <p className="text-xs text-muted-foreground">Allow new contestants to register</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vote-price">Price per Vote (₦)</Label>
                  <Input id="vote-price" type="number" defaultValue={50} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edition">Current Edition</Label>
                  <Input id="edition" defaultValue="2024" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Profile</CardTitle>
              <CardDescription>Your personal information as a super admin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Name</Label>
                  <Input id="firstName" defaultValue="Super Admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="thenaijacreativehub@gmail.com" readOnly />
                </div>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Super Administrator" readOnly />
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>How you receive updates about the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-full"><Mail className="h-4 w-4" /></div>
                    <div>
                        <Label>Email Notifications</Label>
                        <p className="text-xs text-muted-foreground">Get daily summaries and critical alerts</p>
                    </div>
                </div>
                <Switch defaultChecked />
              </div>
               <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-full"><Smartphone className="h-4 w-4" /></div>
                    <div>
                        <Label>Real-time Push</Label>
                        <p className="text-xs text-muted-foreground">Get notified immediately on every vote</p>
                    </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your authentication methods and data safety</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Currently disabled. We recommend enabling it for better security.</p>
                  </div>
                </div>
                <Button size="sm">Enable</Button>
              </div>
              <Button variant="outline" className="w-full">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSave} disabled={loading} className="gap-2">
            {loading ? <Zap className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save All Changes
        </Button>
      </div>
    </div>
  )
}
