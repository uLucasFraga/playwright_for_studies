const { test, expect } = require('@playwright/test')
const { StatusCodes } = require('http-status-codes')
const { 
  LOGIN_SUCCESS, 
  LOGIN_FAIL 
} = require('serverest/src/utils/constants')
const { getUserBody } = require('../../../lib/helper')

test.describe.parallel('[LOGIN] :: SERVEREST - API', () => {
  let body

  test.beforeEach(async ({ request }) => {
    body = getUserBody()

    await request.post('/usuarios', { data: body })
  })

  test('login successfully', async ({ request }) => {
    const loginBody = {
      email: body.email,
      password: body.password,
    }

    const response = await request.post('/login', { data: loginBody })
    const login = await response.json()

    expect(response.status()).toEqual(StatusCodes.OK)
    expect(login.message).toEqual(LOGIN_SUCCESS)
  })

  test('login with email inexistent on the base', async ({ request }) => {
    const loginBody = {
      email: 'invalid@email.com',
      password: body.password,
    }

    const response = await request.post('/login', { data: loginBody })
    const login = await response.json()

    expect(response.status()).toEqual(StatusCodes.UNAUTHORIZED)
    expect(login.message).toEqual(LOGIN_FAIL)
  })

  test('login with invalid password', async ({ request }) => {
    const loginBody = {
      email: body.email,
      password: 'invalid-password',
    }

    const response = await request.post('/login', { data: loginBody })
    const login = await response.json()

    expect(response.status()).toEqual(StatusCodes.UNAUTHORIZED)
    expect(login.message).toEqual('Email e/ou senha inválidos')
  })

  test('login with invalid email and password', async ({ request }) => {
    const loginBody = {
      email: 'invalid@email.com',
      password: 'invalid-password',
    }

    const response = await request.post('/login', { data: loginBody })
    const login = await response.json()

    expect(response.status()).toEqual(StatusCodes.UNAUTHORIZED)
    expect(login.message).toEqual('Email e/ou senha inválidos')
  })

  test('login with blank data', async ({ request }) => {
    const loginBody = {
      email: '',
      password: '',
    }

    const response = await request.post('/login', { data: loginBody })
    const login = await response.json()

    expect(response.status()).toEqual(StatusCodes.BAD_REQUEST)
    expect(login.email).toEqual('email não pode ficar em branco')
    expect(login.password).toEqual('password não pode ficar em branco')
  })
})
