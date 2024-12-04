Hướng dẫn cài đặt và chạy dự án
# Clone dự án về máy
Sử dụng lệnh dưới đây để clone dự án từ repository: 
git clone <https://github.com/truongvy2605/Todo-App.git>

Sau khi clone, di chuyển vào thư mục dự án bằng lệnh:
cd <thư_mục_dự_án>

## Cài đặt môi trường
Đảm bảo máy tính của bạn đã cài đặt Node.js và npm. Nếu chưa, bạn có thể tải và cài đặt từ trang chủ Node.js.

### Cài đặt các package cần thiết
Chạy lệnh sau để cài đặt các thư viện cần thiết
npm install

#### Chạy dự án
Sử dụng lệnh dưới đây để khởi chạy dự án:
npm start

Mở trình duyệt và truy cập http://localhost:3000 để xem giao diện ứng dụng.

--------------------------------------------------------------------------------------------------
# Giải thích cấu trúc dự án

1. Thư mục chính

`src`: Chứa toàn bộ mã nguồn của ứng dụng.

`components`: Các component chính của ứng dụng.

`todoForm`: Form nhập thông tin todo mới.

`todoList`: Hiển thị danh sách các todo chưa hoàn thành.

`completedList`: Hiển thị danh sách các todo đã hoàn thành.

`hooks`:

`useLocalStorage.js`: Custom hook để quản lý state với LocalStorage.

`services`:

`todoService`: Các hàm xử lý nghiệp vụ (thêm, xoá, hoàn thành todo).

`styles`:

`App.css`: Các style chính cho ứng dụng.

`App.js`: File chính quản lý logic và hiển thị giao diện.

--------------------------------------------------------------------------------------------------
# Liệt kê các tính năng đã làm được

1. Thêm Todo
Cho phép người dùng nhập tiêu đề và mô tả để thêm một todo mới.

2. Kiểm tra tính hợp lệ: yêu cầu tiêu đề và mô tả không được để trống.

3. Hiển thị danh sách Todo

4. Hiển thị danh sách các todo chưa hoàn thành.

5. Xóa Todo

6. Xóa một todo khỏi danh sách todo chưa hoàn thành.

7. Đánh dấu hoàn thành Todo

8. Chuyển todo từ danh sách chưa hoàn thành sang danh sách đã hoàn thành.

9. Hiển thị danh sách Todo đã hoàn thành

10. Hiển thị danh sách các todo đã hoàn thành ở màn hình riêng.

11. Xóa Todo đã hoàn thành

12. Xóa một todo khỏi danh sách đã hoàn thành.

13. Chỉnh sửa Todo
Cho phép cập nhật tiêu đề và mô tả của todo trong danh sách chưa hoàn thành.

14. Thông báo trạng thái

15. Hiển thị thông báo khi thêm, xóa, hoàn thành hoặc chỉnh sửa todo.

16. Tự động lưu vào LocalStorage

17. Tự động lưu trạng thái danh sách todo và danh sách đã hoàn thành vào LocalStorage.

18. Hiển thị trạng thái tải (Loading)

19. Hiển thị spinner khi thực hiện các thao tác như thêm, xóa, hoàn thành hoặc chỉnh sửa todo.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
