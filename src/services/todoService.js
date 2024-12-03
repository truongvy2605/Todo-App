// Hàm thêm một todo mới vào danh sách todos hiện tại
export const addTodo = (todos, newTodo) => [...todos, newTodo];

// Hàm xóa một todo khỏi danh sách todos theo chỉ số
export const deleteTodo = (todos, index) => {
  // Tạo một bản sao của danh sách todos để tránh thay đổi nguyên bản
  const updatedTodos = [...todos];
   // Xóa 1 phần tử tại chỉ số index
  updatedTodos.splice(index, 1);
  // Trả về danh sách todos đã được cập nhật
  return updatedTodos;
};

// Tạo một bản sao của danh sách todos để tránh thay đổi nguyên bản
export const completeTodo = (todos, index, completedTodos) => {
  // Lấy thời gian hiện tại
  const now = new Date();
  // Định dạng thời gian hoàn thành dưới dạng chuỗi
  const completedOn = now.toLocaleString();
  // Tạo một bản sao của todo tại chỉ số index và thêm thời gian hoàn thành
  const completedItem = { ...todos[index], completedOn };

  // Trả về một đối tượng chứa hai danh sách được cập nhật:
  // - danh sách todos (sau khi xóa phần tử đã hoàn thành)
  // - danh sách completedTodos (với todo mới được đánh dấu là hoàn thành)
  return {
    updatedTodos: deleteTodo(todos, index),
    updatedCompletedTodos: [...completedTodos, completedItem],
  };
};
