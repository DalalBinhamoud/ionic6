import { TestBed } from '@angular/core/testing'

import { ProductsService } from './products.service'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'

describe('ProductsService', () => {
  let service: ProductsService
  let httpClient: HttpClient
  let httpTestClient: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(ProductsService)
    httpClient = TestBed.inject(HttpClient)
    httpTestClient = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestClient.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should make api call ', () => {
    const mockResponse = [
      {
        id: 1,
        title: 'Simons Product',
        price: 42.99,
        description: 'Epic product test',
      },
    ]
    service.getProducts().subscribe((res) => {
      expect(res).toEqual(mockResponse)
    })

    const mockRequest = httpTestClient.expectOne(
      'https://fakestoreapi.com/products',
    )

    expect(mockRequest.request.method).toBe('GET')
    mockRequest.flush(mockResponse)
  })
})
