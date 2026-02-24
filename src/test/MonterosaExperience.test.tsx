import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

import App from '../App'
import { getExperience, embed } from '@monterosa/sdk-launcher-kit'

vi.mock('@monterosa/sdk-launcher-kit', () => {
  return {
    getExperience: vi.fn(() => ({ id: 'fake-experience' })),
    embed: vi.fn(),
    unmount: vi.fn(),
  }
})

describe('Monterosa integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the Ca$ino album shell', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /ca\$ino/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /baby keem/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/11 tracks\. no skips/i)).toBeInTheDocument()
  })

  it('attempts to embed Monterosa experiences when App renders', () => {
    render(<App />)

    expect(getExperience).toHaveBeenCalled()
    expect(embed).toHaveBeenCalled()
  })

  it('logs an error and does not crash when an experience fails to load', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    ;(getExperience as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(
      () => {
        throw new Error('Boom')
      },
    )

    render(<App />)

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to embed Monterosa experience',
      expect.objectContaining({ error: expect.any(Error) }),
    )

    expect(
      screen.getByRole('heading', { name: /ca\$ino/i }),
    ).toBeInTheDocument()

    consoleSpy.mockRestore()
  })
})
