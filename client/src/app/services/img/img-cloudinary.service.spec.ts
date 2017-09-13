import { TestBed, inject } from '@angular/core/testing';

import { ImgCloudinaryService } from './img-cloudinary.service';

describe('ImgCloudinaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImgCloudinaryService]
    });
  });

  it('should be created', inject([ImgCloudinaryService], (service: ImgCloudinaryService) => {
    expect(service).toBeTruthy();
  }));
});
