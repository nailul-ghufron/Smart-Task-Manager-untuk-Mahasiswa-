import { TaskService } from '../services/TaskService.js';
import { eventBus } from '../utils/eventBus.js';
import { dateHelper } from '../utils/dateHelper.js';

export const UIController = {
  elements: {},
  currentFilters: {
    priority: 'all',
    status: 'all',
    deadlineRange: 'all'
  },
  currentSort: 'deadline_asc',
  editingTaskId: null,

  init() {
    this.cacheDOM();
    this.bindEvents();
    
    // Subscribe to task updates
    eventBus.on('tasks-updated', () => this.renderTasks());
    
    this.renderTasks();
  },

  cacheDOM() {
    this.elements = {
      taskList: document.getElementById('taskList'),
      newTaskBtn: document.getElementById('newTaskBtn'),
      taskModal: document.getElementById('taskModal'),
      taskForm: document.getElementById('taskForm'),
      closeModalBtn: document.getElementById('closeModalBtn'),
      modalTitle: document.getElementById('modalTitle'),
      
      // Filters
      filterPriority: document.getElementById('filterPriority'),
      filterStatus: document.getElementById('filterStatus'),
      filterDeadline: document.getElementById('filterDeadline'),
      sortSelect: document.getElementById('sortSelect'),

      // Form inputs
      taskIdInput: document.getElementById('taskIdInput'),
      taskTitleInput: document.getElementById('taskTitleInput'),
      taskDescInput: document.getElementById('taskDescInput'),
      taskDeadlineInput: document.getElementById('taskDeadlineInput'),
      taskPriorityInput: document.getElementById('taskPriorityInput'),
    };
  },

  bindEvents() {
    this.elements.newTaskBtn.addEventListener('click', () => this.openModal());
    this.elements.closeModalBtn.addEventListener('click', () => this.closeModal());
    this.elements.taskForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    
    // Filters & Sorting
    this.elements.filterPriority.addEventListener('change', (e) => {
      this.currentFilters.priority = e.target.value;
      this.renderTasks();
    });
    this.elements.filterStatus.addEventListener('change', (e) => {
      this.currentFilters.status = e.target.value;
      this.renderTasks();
    });
    this.elements.filterDeadline.addEventListener('change', (e) => {
      this.currentFilters.deadlineRange = e.target.value;
      this.renderTasks();
    });
    this.elements.sortSelect.addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.renderTasks();
    });

    // Task actions (delegation)
    this.elements.taskList.addEventListener('click', (e) => {
      const target = e.target;
      const taskItem = target.closest('.task-item');
      if (!taskItem) return;
      const taskId = taskItem.dataset.id;

      if (target.classList.contains('toggle-status-btn') || target.tagName === 'INPUT' && target.type === 'checkbox') {
        TaskService.toggleStatus(taskId);
        eventBus.emit('tasks-updated');
      } else if (target.closest('.edit-btn')) {
        this.openModal(taskId);
      } else if (target.closest('.delete-btn')) {
        if(confirm("Yakin hapus tugas ini?")) {
          TaskService.deleteTask(taskId);
          eventBus.emit('tasks-updated');
        }
      }
    });

    // close modal on overlay click
    this.elements.taskModal.addEventListener('click', (e) => {
      if(e.target === this.elements.taskModal) this.closeModal();
    });

    // close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.elements.taskModal.classList.contains('hidden')) {
        this.closeModal();
      }
    });
  },

  openModal(taskId = null) {
    this.editingTaskId = taskId;
    this.elements.taskForm.reset();
    
    if (taskId) {
      this.elements.modalTitle.textContent = "Edit Tugas";
      const tasks = TaskService.getAllTasks();
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        this.elements.taskTitleInput.value = task.title;
        this.elements.taskDescInput.value = task.description || '';
        if (task.deadline) {
          const date = new Date(task.deadline);
          // Set to local time for input type="datetime-local" (YYYY-MM-DDTHH:MM)
          const tzOffset = date.getTimezoneOffset() * 60000;
          const localISO = new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
          this.elements.taskDeadlineInput.value = localISO;
        }
        this.elements.taskPriorityInput.value = task.priority;
      }
    } else {
      this.elements.modalTitle.textContent = "Tugas Baru";
    }

    this.elements.taskModal.classList.remove('hidden');
    this.elements.taskModal.classList.add('flex');
    
    // small delay for animation
    setTimeout(() => {
        const modalContent = this.elements.taskModal.querySelector('form').parentElement.parentElement;
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
  },

  closeModal() {
    const modalContent = this.elements.taskModal.querySelector('form').parentElement.parentElement;
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        this.elements.taskModal.classList.add('hidden');
        this.elements.taskModal.classList.remove('flex');
        this.editingTaskId = null;
    }, 200);
  },

  handleFormSubmit(e) {
    e.preventDefault();
    try {
      let deadlineIso = null;
      if (this.elements.taskDeadlineInput.value) {
           const d = new Date(this.elements.taskDeadlineInput.value);
           if (!isNaN(d.getTime())) {
               deadlineIso = d.toISOString();
           } else {
               // Let TaskService or browser handle partially filled input if needed, 
               // but don't crash with toISOString() on Invalid Date
           }
      }

      const data = {
        title: this.elements.taskTitleInput.value,
        description: this.elements.taskDescInput.value,
        deadline: deadlineIso,
        priority: this.elements.taskPriorityInput.value
      };

      if (this.editingTaskId) {
        TaskService.editTask(this.editingTaskId, data);
      } else {
        TaskService.addTask(data);
      }

      this.closeModal();
      eventBus.emit('tasks-updated');
    } catch (error) {
      alert(error.message);
    }
  },

  renderTasks() {
    let tasks = TaskService.getAllTasks();
    tasks = TaskService.filterTasks(tasks, this.currentFilters);
    tasks = TaskService.sortTasks(tasks, this.currentSort);

    if (tasks.length === 0) {
      this.elements.taskList.innerHTML = `
        <div class="flex flex-col items-center justify-center p-12 text-slate-400 bg-white/40 dark:bg-slate-800/40 rounded-3xl border border-dashed border-slate-300 dark:border-slate-600">
          <svg class="w-20 h-20 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          <p class="text-xl font-semibold">Tidak ada tugas</p>
          <p class="text-sm mt-1">Silakan sesuaikan filter atau tambahkan tugas baru.</p>
        </div>
      `;
      return;
    }

    const priorityColors = {
      high: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30 shadow-sm',
      medium: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30 shadow-sm',
      low: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30 shadow-sm'
    };

    const priorityLabel = {
      high: 'Tinggi',
      medium: 'Sedang',
      low: 'Rendah'
    };

    const isOverdue = (task) => task.deadline && new Date(task.deadline) < new Date() && task.status !== 'completed';

    this.elements.taskList.innerHTML = tasks.map((task, index) => {
      const overdue = isOverdue(task);
      const isCompleted = task.status === 'completed';
      const deadlineStr = task.deadline ? dateHelper.formatDate(task.deadline) : 'Tanpa Deadline';
      const remainingStr = task.deadline ? dateHelper.remainingTime(task.deadline) : '';
      
      const animationDelay = index * 40;

      return `
        <div class="task-item group flex flex-col sm:flex-row items-start sm:items-center p-5 mb-4 bg-white/70 dark:bg-slate-800/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${isCompleted ? 'opacity-50 grayscale-[0.8] hover:grayscale-0' : ''}" data-id="${task.id}" style="animation: slideInUp 0.4s ease-out forwards ${animationDelay}ms; opacity: 0; transform: translateY(15px);">
          
          <div class="flex items-center w-full sm:w-auto flex-1">
            <div class="flex-shrink-0 relative flex items-center justify-center mr-5">
              <input type="checkbox" class="w-7 h-7 rounded-full border-2 border-slate-300 dark:border-slate-500 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all cursor-pointer appearance-none checked:bg-indigo-500 checked:border-indigo-500" ${isCompleted ? 'checked' : ''} title="Tandai selesai">
              <svg class="w-4 h-4 text-white absolute pointer-events-none opacity-0 ${isCompleted ? 'opacity-100' : ''} transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            
            <div class="flex flex-col flex-1 truncate pr-4">
              <h3 class="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 truncate transition-all duration-300 ${isCompleted ? 'line-through text-slate-500 dark:text-slate-400' : ''}">
                ${task.title}
              </h3>
              ${task.description ? `<p class="text-sm text-slate-500 dark:text-slate-400 truncate mt-1">${task.description}</p>` : ''}
              
              <div class="flex items-center gap-2 mt-3 flex-wrap">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${priorityColors[task.priority]}">
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5 ${task.priority === 'high' ? 'bg-rose-500' : (task.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500')}"></span>
                  ${priorityLabel[task.priority]}
                </span>
                
                ${task.deadline ? `
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${overdue ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-400' : 'bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-700/50 dark:border-slate-600 dark:text-slate-300'}">
                    <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    ${deadlineStr} ${remainingStr ? `· ${remainingStr}` : ''}
                  </span>
                ` : ''}

                ${overdue ? `<span class="animate-pulse flex items-center text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/20 px-2.5 py-1 rounded-full"><span class="mr-1">⚠️</span> Overdue</span>` : ''}
              </div>
            </div>
          </div>
          
          <div class="flex flex-row items-center mt-4 sm:mt-0 gap-2 w-full sm:w-auto justify-end opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <button class="edit-btn p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-all hover:scale-110 active:scale-95 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800" title="Edit">
              <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
            <button class="delete-btn p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-full transition-all hover:scale-110 active:scale-95 border border-transparent hover:border-rose-100 dark:hover:border-rose-800" title="Hapus">
              <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
};
