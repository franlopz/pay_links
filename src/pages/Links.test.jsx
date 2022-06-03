import { AppContextProvider } from '@/context/DateRangeContext'
import { screen, cleanup, render, act } from '@testing-library/react'
import { afterEach, describe, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Links from './Links'
import styles from './Links.module.css'
import usePayLink from '@/hooks/usePayLink'
vi.mock('@/hooks/usePayLink')

afterEach(() => {
  cleanup()
})

describe('Link page component', () => {
  test('If no data, display "Sin datos"', async () => {
    usePayLink.mockReturnValue({
      linksData: { created: [], sent: [] },
      updateLinkStatus: vi.fn(),
      getLinks: vi.fn(),
      loading: false,
    })
    await act(async () => {
      render(
        <AppContextProvider>
          <Links />
        </AppContextProvider>
      )
    })
    let noDataCard = await screen.findByText('Sin datos')
    const sentButton = await screen.findByText('Enviados')
    expect(noDataCard).toBeInTheDocument()
    await userEvent.click(sentButton)
    noDataCard = await screen.findByText('Sin datos')
    expect(noDataCard).toBeInTheDocument()
  })

  test('if data, display cards', async () => {
    usePayLink.mockReturnValue({
      updateLinkStatus: vi.fn(),
      getLinks: vi.fn(),
      loading: false,
      linksData: {
        created: [
          {
            id: 1,
            key: 'https://google.com',
            customer: 'Fran',
            phone: '77515371',
            date: Date.now(),
            total: 10.44,
            orders: '*1 Coca',
            status: 'created',
            url: 'https://google.com',
            updateLink: vi.fn(),
            getLinks: vi.fn(),
          },
        ],
        sent: [
          {
            id: 2,
            key: 'https://google.com',
            customer: 'Fran',
            phone: '77515371',
            date: Date.now(),
            total: 22.44,
            orders: '*4 Coca',
            status: 'sent',
            url: 'https://google.com',
            updateLink: vi.fn(),
            getLinks: vi.fn(),
          },
          {
            id: 2,
            key: 'https://google.com/es',
            customer: 'Fran',
            phone: '77515371',
            date: Date.now(),
            total: 22.44,
            orders: '*4 Coca',
            status: 'sent',
            url: 'https://google.com/es',
            updateLink: vi.fn(),
            getLinks: vi.fn(),
          },
        ],
      },
    })
    await act(async () => {
      render(
        <AppContextProvider>
          <Links />
        </AppContextProvider>
      )
    })

    const sentButton = await screen.findByText('Enviados')
    let totalLabel = await screen.findAllByText('Total: $', { exact: false })
    expect(totalLabel.length).toBe(1)

    await userEvent.click(sentButton)
    totalLabel = await screen.findAllByText('Total: $', { exact: false })
    expect(totalLabel.length).toBe(2)
  })
})
