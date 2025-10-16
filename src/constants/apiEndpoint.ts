// export const BASE_URL = 'https://bindu-jewellery-backend.vercel.app/api';
export const BASE_URL = 'http://localhost:8080/api';


// Auth API
export const SignUpApi = '/users/register';
export const SendOTPApi = '/auth/send-otp';
export const VerifyOTPApi = '/auth/verify-otp';
export const LoginApi = '/auth/login';



export const GetbannerApi = '/banners';
export const GetCategoryApi = '/categories/many';

export const SendEnquriyApi = '/enquiries';

// profile
export const GetMyProfileApi = '/users/profile';

export const UpdateProfileApi = '/users';


export const AddMyAddressApi = '/users/addresses';
export const UpdateMyAddressApi = '/users/addresses';
export const DeleteMyAddressApi = '/users/addresses';
export const GetMyAddressApi = '/users/addresses/own';


export const GetMyWhishlist = '/users/wishlists';
export const AddToWhishlistApi = '/users/wishlists/add';
export const RemoveFromWhishlistApi = '/users/wishlists/remove';

// product

export const GetAllProductsApi = '/products/many';
export const GetProductByIdApi = '/products';



export const GetMyCartApi = '/users/carts';

export const AddToCartApi = '/users/carts/add';
export const RemoveCartApi = '/users/carts/remove';
export const UpdateCartApi = '/users/carts/update';

// Media

export const GetMediaApi = '/media';


export const GetAllBlogsApi = '/blogs';

export const GetBlogBySlugApi = '/blogs/slug';


