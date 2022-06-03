import { AppContextProvider } from '@/context/DateRangeContext'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import DatePicker from './DatePicker'
import RefreshButton from './RefreshButton'
import userEvent from '@testing-library/user-event'
import styles from './DatePicker.module.css'

afterEach(() => {
  cleanup()
})

describe('DatePicker component', () => {
  const getLinks = vi.fn()
  test('If reload button is shown as disabled when date range is incomplete', async () => {
    const { container } = render(
      <AppContextProvider>
        <DatePicker>
          <RefreshButton loading={false} onClick={() => getLinks()} />
        </DatePicker>
      </AppContextProvider>
    )
    const inputElement = screen.getByTestId('date-picker-input')
    const buttonElement = await screen.findByRole('button')
    expect(inputElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()

    await userEvent.click(inputElement)
    const todayItem = container.querySelector('.react-datepicker__today-button')
    expect(buttonElement).toHaveClass(styles['icon-container'])
    await userEvent.click(todayItem)
    expect(buttonElement).toHaveClass(styles['icon-container-disabled'])
    await userEvent.click(todayItem)
    expect(buttonElement).toHaveClass(styles['icon-container'])
  })

  test('If reload button is not clickable when date range is incomplete', async () => {
    const { container } = render(
      <AppContextProvider>
        <DatePicker>
          <RefreshButton loading={false} onClick={() => getLinks()} />
        </DatePicker>
      </AppContextProvider>
    )
    const inputElement = screen.getByTestId('date-picker-input')
    const buttonElement = await screen.findByRole('button')
    expect(inputElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()

    await userEvent.click(inputElement)
    const todayItem = container.querySelector('.react-datepicker__today-button')
    await userEvent.click(todayItem)
    await userEvent.click(buttonElement)
    expect(getLinks).toHaveBeenCalledTimes(0)

    await userEvent.click(inputElement)
    await userEvent.click(todayItem)
    await userEvent.click(buttonElement)
    expect(getLinks).toHaveBeenCalledTimes(1)
  })

  test('If reload button has animation when loading', async () => {
    const { container } = render(
      <AppContextProvider>
        <DatePicker>
          <RefreshButton loading={true} onClick={() => getLinks()} />
        </DatePicker>
      </AppContextProvider>
    )

    const buttonElement = container.querySelector(`.${styles['svg-icon']}`)
    expect(buttonElement).toHaveClass(styles.loading)
  })

  test('If reload button has no animation when loading', async () => {
    const { container } = render(
      <AppContextProvider>
        <DatePicker>
          <RefreshButton loading={false} onClick={() => getLinks()} />
        </DatePicker>
      </AppContextProvider>
    )

    const buttonElement = container.querySelector(`.${styles['svg-icon']}`)
    expect(buttonElement).not.toHaveClass(styles.loading)
  })
})
