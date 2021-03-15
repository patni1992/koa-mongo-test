import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import initMockServer from '../../../mockServer'
import ControllerList from './ControllerList'
import locationsResponse from '../../../mockServer/locationsResponse'

const mockServer = initMockServer()
const controller1 = locationsResponse[0].controllers[0]
const controller2 = locationsResponse[0].controllers[1]
const { address } = locationsResponse[0]

describe('Controller list page', () => {
  beforeAll(() => mockServer.listen())
  afterEach(() => mockServer.resetHandlers())
  afterAll(() => mockServer.close())

  it('should display a list of controllers when rendering ControllerList', async () => {
    render(
      <MemoryRouter>
        <ControllerList />
      </MemoryRouter>
    )
    await waitFor(() => expect(screen.getByTestId(`controller-link-${controller1.controllerId}`)).toBeInTheDocument())
    expect(screen.getByText(controller1.id)).toBeInTheDocument()
    expect(screen.getByText(controller2.id)).toBeInTheDocument()
  })

  it('should display address when rendering a controller', async () => {
    render(
      <MemoryRouter>
        <ControllerList />
      </MemoryRouter>
    )
    await waitFor(() => expect(screen.getByTestId(`controller-link-${controller1.controllerId}`)).toBeInTheDocument())
    const controller = screen.getByTestId(`controller-link-${controller1.controllerId}`)
    expect(controller).toHaveTextContent(address.street)
    expect(controller).toHaveTextContent(address.zip)
    expect(controller).toHaveTextContent(address.city)
  })

  it('should display a link to detail page when rendering a controller', async () => {
    render(
      <MemoryRouter>
        <ControllerList />
      </MemoryRouter>
    )
    await waitFor(() => expect(screen.getByTestId(`controller-link-${controller1.controllerId}`)).toBeInTheDocument())
    const controller = screen.getByTestId(`controller-link-${controller1.controllerId}`)
    expect(controller).toHaveAttribute('href', `/controllers/${controller1.id}`)
  })
})
