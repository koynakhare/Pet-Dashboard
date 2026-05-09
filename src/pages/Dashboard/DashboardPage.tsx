import { Container } from '@mui/material'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityChart,
  ActivityTimeline,
  AnalyticsCards,
  DashboardHeader,
  DashboardHero,
  DashboardSidebar,
  QuickActions,
  RecentPets,
  StatsCards,
  activityTimeline,
  analyticsInsights,
  dashboardStats,
  downloadsByDay,
  galleryActivity,
  galleryInsightLines,
  petCategories,
  quickActions,
  recentDownloads,
  recentPets as recentPetsSeed,
  uploadsTrend,
} from '@/components/dashboard'
import { useAppSelector } from '@/redux/hooks'
import { selectAuthToken } from '@/redux/slices/authSlice'
import './DashboardPage.css'

function readDashboardQueryFlags() {
  if (typeof window === 'undefined') {
    return { chartError: false, recentError: false, recentEmpty: false }
  }
  const params = new URLSearchParams(window.location.search)
  return {
    chartError: params.get('chartError') === '1',
    recentError: params.get('recentError') === '1',
    recentEmpty: params.get('recentEmpty') === '1',
  }
}

function DashboardPage() {
  const token = useAppSelector(selectAuthToken)
  const flags = useMemo(() => readDashboardQueryFlags(), [])
  const [loading, setLoading] = useState(true)
  const [chartError, setChartError] = useState(flags?.chartError)
  const [recentError, setRecentError] = useState(flags?.recentError)

  const recentPetsData = flags?.recentEmpty ? [] : recentPetsSeed

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 950)
    return () => window.clearTimeout(id)
  }, [])

  const retryCharts = useCallback(() => {
    setChartError(false)
  }, [])

  const retryRecent = useCallback(() => {
    setRecentError(false)
  }, [])

  const sessionLine = token
    ? `Secure session active · token …${token.length > 8 ? token.slice(-6) : token}`
    : 'Guest preview · sign in for full analytics sync'

  const summaryLine = useMemo(
    () =>
      'Downloads accelerated 22% this week while gallery views normalized. Selection health is strong — 186 active picks ready for export.',
    [],
  )

  return (
    <div className="dashboard-page-root anim-fade-in">
      <Container maxWidth="xl" className="dashboard-page-container">
        <DashboardHero userLabel="Welcome back, curator" summaryLine={summaryLine} />
        <DashboardHeader title="Operations overview" subtitle={sessionLine} />

        <div className="dashboard-page-layout">
          <div className="dashboard-page-main">
            <StatsCards items={dashboardStats} skeleton={loading} />
            <ActivityChart
              uploads={uploadsTrend}
              downloads={downloadsByDay}
              categories={petCategories}
              activity={galleryActivity}
              error={chartError}
              onRetry={retryCharts}
              skeleton={loading}
            />
            <AnalyticsCards items={analyticsInsights} skeleton={loading} />
            <QuickActions items={quickActions} skeleton={loading} />
            <RecentPets
              pets={recentPetsData}
              error={recentError}
              onRetry={retryRecent}
              skeleton={loading}
            />
            <ActivityTimeline items={activityTimeline} skeleton={loading} />
          </div>

          <DashboardSidebar
            storage={{ usedLabel: '38.4 GB', totalLabel: '100 GB', percent: 38.4 }}
            downloads={recentDownloads}
            selection={{ selected: 186, capacity: 250 }}
            insights={galleryInsightLines}
            skeleton={loading}
          />
        </div>
      </Container>
    </div>
  )
}

export default memo(DashboardPage)
