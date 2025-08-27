'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/shared/utils/cn'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap typo-body-2-sb ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

interface UnderLineTabProps {
  tabs: {
    value: string
    label: string
    content: React.ReactNode
  }[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function UnderLineTab({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className,
}: UnderLineTabProps) {
  const [activeTabRef, setActiveTabRef] =
    React.useState<HTMLButtonElement | null>(null)
  const [selectedValue, setSelectedValue] = React.useState(
    value || defaultValue || tabs[0]?.value,
  )
  const tabRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({})

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
  }

  React.useEffect(() => {
    const activeTab = tabRefs.current[selectedValue]
    if (activeTab) {
      setActiveTabRef(activeTab)
    }
  }, [selectedValue])

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  return (
    <Tabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={handleValueChange}
      className={cn('w-full', className)}
    >
      <div className="relative w-full">
        <TabsList
          className="flex w-full justify-start bg-transparent p-0"
          style={{ gap: '4px' }}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              ref={(el) => {
                tabRefs.current[tab.value] = el
                if (el && tab.value === selectedValue) {
                  setActiveTabRef(el)
                }
              }}
              className="relative px-3 py-[10px] typo-body-2-sb text-grey-color-1 data-[state=active]:bg-transparent data-[state=active]:text-black-color data-[state=active]:shadow-none"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-grey-color-1" />
        {activeTabRef && (
          <div
            className="absolute h-0.5 bg-black-color transition-all duration-200"
            style={{
              left: `${activeTabRef.offsetLeft}px`,
              width: `${activeTabRef.offsetWidth}px`,
              bottom: '1px',
            }}
          />
        )}
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
