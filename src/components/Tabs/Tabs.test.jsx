import { cleanup, render, screen } from '@testing-library/react'
import { beforeEach, vi, test, expect, afterEach } from 'vitest'
import Tabs from './Tabs'
import userEvent from '@testing-library/user-event'
import styles from './Tabs.module.css'

afterEach(() => {
  cleanup()
})

describe('Tabs component', () => {
  test('Tabs rendered', () => {
    const setData = vi.fn()
    render(<Tabs data={{ created: [], sent: [] }} setData={setData} />)

    const notSentTab = screen.queryByText('Sin enviar')
    const sentTab = screen.queryByText('Enviados')
    expect(notSentTab).toBeInTheDocument()
    expect(sentTab).toBeInTheDocument()
  })

  test('Tab change className to active when is clicked', async () => {
    const setData = vi.fn()
    render(<Tabs data={{ created: [], sent: [] }} setData={setData} />)

    const notSentTab = await screen.findByText('Sin enviar')
    const sentTab = await screen.findByText('Enviados')

    expect(notSentTab.parentElement).toHaveClass(styles.active)
    expect(sentTab.parentElement).not.toHaveClass(styles.active)
    await userEvent.click(sentTab)
    expect(sentTab.parentElement).toHaveClass(styles.active)
    expect(notSentTab.parentElement).not.toHaveClass(styles.active)
    await userEvent.click(notSentTab)
    expect(notSentTab.parentElement).toHaveClass(styles.active)
    expect(sentTab.parentElement).not.toHaveClass(styles.active)
    expect(setData).toHaveBeenCalledTimes(3)
  })
})
