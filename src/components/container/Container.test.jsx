import { AppContextProvider } from '@/context/DateRangeContext'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import Container from './Container'
import userEvent from '@testing-library/user-event'
import { test, expect, vi, afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

describe('Container component', () => {
  test('Component render if there is url', () => {
    render(
      <AppContextProvider>
        <Container
          customer="fran"
          id={1}
          phone="77515271"
          date={Date.now()}
          total={123}
          orders="*1 Tawuiza"
          status="created"
          url="https://google.com"
        />
      </AppContextProvider>
    )

    expect(screen.queryByText('Total: $', { exact: false })).toBeTruthy()
  })

  test('Component not render if there is no url', () => {
    render(
      <AppContextProvider>
        <Container
          customer="fran"
          id={1}
          phone="77515271"
          date={Date.now()}
          total={123}
          orders="*1 Tawuiza"
          status="created"
        />
      </AppContextProvider>
    )

    expect(screen.queryByText('Total: $', { exact: false })).toBeNull()
  })

  test('Click on button with text "Enviar" if status is "created"', async () => {
    window.open = vi.fn()
    const updateLink = vi.fn()
    const getLinks = vi.fn()
    render(
      <AppContextProvider>
        <Container
          customer="fran"
          id={1}
          phone="77515271"
          date={Date.now()}
          total={123}
          orders="*1 Tawuiza"
          status="created"
          url="https://google.com"
          updateLink={updateLink}
          getLinks={getLinks}
        />
      </AppContextProvider>
    )
    const buttonElement = screen.queryByText('Enviar')
    await userEvent.click(buttonElement)
    expect(window.open).toHaveBeenCalledTimes(1)
    expect(updateLink).toHaveBeenCalledTimes(1)
    expect(getLinks).toHaveBeenCalledTimes(1)
  })

  test('Click on button with text "Reenviar" if status is "sent"', async () => {
    window.open = vi.fn()
    const updateLink = vi.fn()
    const getLinks = vi.fn()
    render(
      <AppContextProvider>
        <Container
          customer="fran"
          id={1}
          phone="77515271"
          date={Date.now()}
          total={123}
          orders="*1 Tawuiza"
          status="sent"
          url="https://google.com"
          updateLink={updateLink}
          getLinks={getLinks}
        />
      </AppContextProvider>
    )
    const buttonElement = screen.queryByText('Reenviar')
    await userEvent.click(buttonElement)
    expect(window.open).toHaveBeenCalledTimes(1)
    expect(updateLink).toHaveBeenCalledTimes(1)
    expect(getLinks).toHaveBeenCalledTimes(1)
  })
})
