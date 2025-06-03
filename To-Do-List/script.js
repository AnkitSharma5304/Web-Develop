// Professional Todo App with Enhanced Features
class TodoApp {
  constructor() {
    
    this.todoForm = document.getElementById('todo-form');
    this.todoInput = document.getElementById('todo-input');
    this.todoListContainer = document.querySelector('.todo-list-container');
    this.clearAllButton = document.getElementById('clear-all');
    this.taskCounter = document.querySelector('.task-counter');
    this.itemsLeftCounter = document.querySelector('.items-left');
    this.emptyState = document.querySelector('.empty-state');
    
    this.filterButtons = document.querySelectorAll('.filter-btn');
   
    this.STORAGE_KEY = 'professional-todos';
    
    this.currentFilter = 'all';
   
    this.init();
  }
  
  init() {

    this.loadTodos();
    
    this.renderTodos();
   
    this.setupEventListeners();
    
    this.updateCounters();
  }
  
  loadTodos() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.todos = stored ? JSON.parse(stored) : [];
  }
  
  saveTodos() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
    this.updateCounters();
  }
  
  generateId() {
    return crypto.randomUUID();
  }
  
  createTodoElement(todo) {
    const todoEl = document.createElement('div');
    todoEl.className = 'todo-item';
    todoEl.dataset.id = todo.id;
    
    if (todo.completed) {
      todoEl.classList.add('completed');
    }
    
    todoEl.innerHTML = `
      <div class="todo-content">
        <input 
          type="checkbox" 
          class="todo-checkbox" 
          ${todo.completed ? 'checked' : ''}
          aria-label="${todo.completed ? 'Mark as incomplete' : 'Mark as complete'}"
        >
        <span class="todo-text">${todo.text}</span>
      </div>
      <div class="action-items">
        <button class="action-btn edit" aria-label="Edit task">
          <i class="fas fa-pen"></i>
        </button>
        <button class="action-btn delete" aria-label="Delete task">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    
    const checkbox = todoEl.querySelector('.todo-checkbox');
    const editBtn = todoEl.querySelector('.edit');
    const deleteBtn = todoEl.querySelector('.delete');
    const todoText = todoEl.querySelector('.todo-text');
    
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      todoEl.classList.toggle('completed', todo.completed);
      this.saveTodos();
      this.updateCounters();
      
      if (this.currentFilter !== 'all') {
        this.renderTodos();
      }
    });
   
    editBtn.addEventListener('click', () => {
      const currentText = todoText.textContent;
      todoText.contentEditable = true;
      todoText.focus();
      
      const range = document.createRange();
      range.selectNodeContents(todoText);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    
      const handleSave = () => {
        todoText.contentEditable = false;
        const newText = todoText.textContent.trim();
        
        if (newText && newText !== currentText) {
          todo.text = newText;
          this.saveTodos();
        } else if (!newText) {
          todoText.textContent = currentText;
        }
        
       
        todoText.removeEventListener('blur', handleSave);
        todoText.removeEventListener('keydown', handleKeyDown);
      };
      
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSave();
        } else if (e.key === 'Escape') {
          todoText.textContent = currentText;
          handleSave();
        }
      };
      
      todoText.addEventListener('blur', handleSave);
      todoText.addEventListener('keydown', handleKeyDown);
    });
    
    deleteBtn.addEventListener('click', () => {
      this.todos = this.todos.filter(t => t.id !== todo.id);
      this.saveTodos();
      this.renderTodos();
    });
    
    return todoEl;
  }
  
  renderTodos() {

    this.todoListContainer.innerHTML = '';
    
  
    let filteredTodos = [];
    
    switch (this.currentFilter) {
      case 'active':
        filteredTodos = this.todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = this.todos.filter(todo => todo.completed);
        break;
      default:
        filteredTodos = [...this.todos];
    }
    
    filteredTodos.forEach(todo => {
      const todoEl = this.createTodoElement(todo);
      this.todoListContainer.appendChild(todoEl);
    });
    
    if (this.todos.length === 0) {
      this.emptyState.style.display = 'flex';
    } else if (filteredTodos.length === 0) {
      this.emptyState.style.display = 'flex';
      this.emptyState.innerHTML = `
        <i class="far fa-clipboard"></i>
        <p>No ${this.currentFilter} tasks</p>
      `;
    } else {
      this.emptyState.style.display = 'none';
    }
  }
  
  updateCounters() {
    const totalTasks = this.todos.length;
    const activeTasks = this.todos.filter(todo => !todo.completed).length;
    
    this.taskCounter.textContent = `${totalTasks} ${totalTasks === 1 ? 'task' : 'tasks'}`;
    
    this.itemsLeftCounter.textContent = `${activeTasks} ${activeTasks === 1 ? 'item' : 'items'} left`;
  }
  
  handleAddTodo(e) {
    e.preventDefault();
    
    const text = this.todoInput.value.trim();
    if (!text) return;
    
    const newTodo = {
      id: this.generateId(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    this.todos.push(newTodo);
    this.saveTodos();
    this.renderTodos();
    
    this.todoInput.value = '';
    this.todoInput.focus();
  }
  
  handleClearAll() {
    const completedTodos = this.todos.filter(todo => todo.completed);
    
    if (completedTodos.length === 0) {
      alert('There are no completed tasks to clear.');
      return;
    }
    
    const confirmClear = confirm(`Are you sure you want to clear ${completedTodos.length} completed ${completedTodos.length === 1 ? 'task' : 'tasks'}?`);
    
    if (confirmClear) {
      this.todos = this.todos.filter(todo => !todo.completed);
      this.saveTodos();
      this.renderTodos();
    }
  }
  
  setupEventListeners() {
    
    this.todoForm.addEventListener('submit', (e) => this.handleAddTodo(e));
    
    this.clearAllButton.addEventListener('click', () => this.handleClearAll());
    
    
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.currentFilter = button.dataset.filter;
        this.renderTodos();
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});