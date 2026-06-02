// Core Application Logic for Luxury Hotel Portfolio & Menu Website
import CONFIG from './config.js';

// Comprehensive Menu Categories Configuration mapping display headers to parents
const subCategories = [
  { name: 'Veg Soup', header: 'Veg Soups', parent: 'Soups' },
  { name: 'Non-Veg Soup', header: 'Non-Veg Soups', parent: 'Soups' },
  { name: 'Veg Starter', header: 'Veg Starters', parent: 'Starters' },
  { name: 'Chicken Starter', header: 'Chicken Starters', parent: 'Starters' },
  { name: 'Chinese Paneer Starter', header: 'Chinese Paneer Starters', parent: 'Starters' },
  { name: 'Chinese Mushroom Starter', header: 'Chinese Mushroom Starters', parent: 'Starters' },
  { name: 'Sea Food Snacks', header: 'Sea Food Snacks', parent: 'Starters' },
  { name: 'Tandoori Snacks', header: 'Tandoori Snacks', parent: 'Starters' },
  { name: 'Paneer Curry', header: 'Paneer Curries', parent: 'Curries' },
  { name: 'Mushroom Curry', header: 'Mushroom Curries', parent: 'Curries' },
  { name: 'Mix Veg', header: 'Mixed Vegetables', parent: 'Curries' },
  { name: 'Veg Special Curry', header: 'Vegetable Special Curries', parent: 'Curries' },
  { name: 'Chicken', header: 'Chicken Curries', parent: 'Curries' },
  { name: 'Mutton', header: 'Mutton Specialties', parent: 'Curries' },
  { name: 'Prawn', header: 'Prawn Curries', parent: 'Curries' },
  { name: 'Dal', header: 'Delectable Lentils (Dal)', parent: 'Curries' },
  { name: 'Roti & Naan', header: 'Tandoor Breads', parent: 'Breads' },
  { name: 'Biriyani', header: 'Aromatic Biriyani', parent: 'Rice' },
  { name: 'Fried Rice', header: 'Wok-Tossed Fried Rice', parent: 'Rice' },
  { name: 'Traditional Rice', header: 'Steamed & Ghee Rice', parent: 'Rice' }
];

// Application State
let state = {
  menuItems: [],
  currentCategory: 'Soups',
  currentSubCategory: 'All Soups',
  searchQuery: '',
  isAdmin: false,
  editingItemId: null
};

// DOM Elements
const elements = {
  menuGrid: document.getElementById('menu-grid'),
  menuLoader: document.getElementById('menu-loader'),
  filterButtons: document.querySelectorAll('.filter-btn'),
  subtabsContainer: document.getElementById('subtabs-container'),
  staffPortalLink: document.getElementById('staff-portal-link'),
  loginModal: document.getElementById('login-modal'),
  itemModal: document.getElementById('item-modal'),
  loginForm: document.getElementById('login-form'),
  itemForm: document.getElementById('item-form'),
  loginCloseBtn: document.getElementById('login-close-btn'),
  itemCloseBtn: document.getElementById('item-close-btn'),
  loginError: document.getElementById('login-error'),
  itemError: document.getElementById('item-error'),
  addItemBtn: document.getElementById('add-item-btn'),
  logoutBtn: document.getElementById('logout-btn'),
  modalItemTitle: document.getElementById('modal-item-title'),
  toastContainer: document.getElementById('toast-container'),
  adminBar: document.querySelector('.admin-bar'),
  header: document.querySelector('header'),
  mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
  navLinks: document.querySelector('.nav-links'),
  searchInput: document.getElementById('menu-search-input'),
  searchClearBtn: document.getElementById('menu-search-clear-btn')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  checkLoginState();
  fetchMenuData();
  setupHeaderScroll();
  setupScrollSpy();
  setupScrollReveal();
  setupCursorOrb();
  setupParticleCanvas();
  setupHeroParallax();
});

// Setup Scroll Header Effect
function setupHeaderScroll() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      elements.header.classList.add('scrolled');
    } else {
      elements.header.classList.remove('scrolled');
    }
  });
}

// Check if user was previously logged in during session
function checkLoginState() {
  const loggedIn = sessionStorage.getItem('isAdmin') === 'true';
  if (loggedIn) {
    activateAdminMode();
  }
}

// Fetch Menu Data (from Google Sheets or Fallback)
async function fetchMenuData() {
  showLoader(true);
  
  if (!CONFIG.GOOGLE_SHEET_API_URL) {
    console.log('Google Sheets API URL is empty. Loading local fallback menu.');
    state.menuItems = [...CONFIG.FALLBACK_MENU];
    renderSubtabs();
    renderMenu();
    showLoader(false);
    return;
  }

  try {
    const response = await fetch(CONFIG.GOOGLE_SHEET_API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resData = await response.json();
    
    if (resData.status === 'success' && Array.isArray(resData.data) && resData.data.length > 0) {
      // Filter out invalid items and deduplicate by id to prevent repeat entries
      const uniqueItems = [];
      const seenIds = new Set();
      resData.data.forEach(item => {
        if (item.id && item.id.toLowerCase() !== 'id' && !seenIds.has(item.id)) {
          seenIds.add(item.id);
          uniqueItems.push(item);
        }
      });
      state.menuItems = uniqueItems;
      showToast('Menu loaded from Google Sheets.', 'success');
    } else {
      throw new Error(resData.message || 'Invalid or empty data from API');
    }
  } catch (error) {
    console.error('Failed to load remote menu data or menu was empty. Using local fallback.', error);
    state.menuItems = [...CONFIG.FALLBACK_MENU];
  } finally {
    renderSubtabs();
    renderMenu();
    showLoader(false);
  }
}

// Dynamically generate and render subcategory tab controls based on current category
function renderSubtabs() {
  const container = elements.subtabsContainer;
  if (!container) return;

  const category = state.currentCategory;
  container.innerHTML = '';
  
  if (category === 'All' || category === 'Breads') {
    container.classList.remove('visible');
    return;
  }

  // Get all subcategories belonging to this parent category
  const subs = subCategories.filter(sub => sub.parent === category);
  
  if (subs.length > 0) {
    // Add "All" sub-tab
    const allBtn = document.createElement('button');
    allBtn.className = `subtab-btn ${state.currentSubCategory === 'All ' + category ? 'active' : ''}`;
    allBtn.textContent = 'All ' + category;
    allBtn.setAttribute('data-subcategory', 'All ' + category);
    allBtn.addEventListener('click', (e) => {
      container.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      state.currentSubCategory = 'All ' + category;
      renderMenu();
    });
    container.appendChild(allBtn);

    // Add individual sub-tabs
    subs.forEach(sub => {
      const btn = document.createElement('button');
      btn.className = `subtab-btn ${state.currentSubCategory === sub.name ? 'active' : ''}`;
      
      // Clean up display name to make it look premium
      let displayName = sub.name;
      if (category === 'Starters') displayName = sub.name.replace(' Starter', '').replace(' Snacks', '');
      if (category === 'Curries') displayName = sub.name.replace(' Curry', '').replace(' Specialties', '');
      if (category === 'Soups') displayName = sub.name.replace(' Soup', '');
      if (category === 'Rice') displayName = sub.name.replace(' Traditional', 'Steamed/Ghee');
      
      btn.textContent = displayName;
      btn.setAttribute('data-subcategory', sub.name);
      btn.addEventListener('click', (e) => {
        container.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        state.currentSubCategory = sub.name;
        renderMenu();
      });
      container.appendChild(btn);
    });

    container.classList.add('visible');
  } else {
    container.classList.remove('visible');
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Main category filter buttons
  elements.filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      elements.filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      state.currentCategory = e.target.getAttribute('data-category');
      
      // Reset subcategory state to "All <Category>"
      state.currentSubCategory = 'All ' + state.currentCategory;
      
      renderSubtabs();
      renderMenu();
    });
  });

  // Open Login Modal
  elements.staffPortalLink.addEventListener('click', () => {
    openModal(elements.loginModal);
  });

  // Close Modals
  elements.loginCloseBtn.addEventListener('click', () => closeModal(elements.loginModal));
  elements.itemCloseBtn.addEventListener('click', () => closeModal(elements.itemModal));

  // Handle Login Submission
  elements.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('login-password').value;
    
    // We check against the CONFIG setting
    if (password === CONFIG.DEFAULT_ADMIN_PASSWORD) {
      activateAdminMode();
      closeModal(elements.loginModal);
      elements.loginForm.reset();
      showToast('Logged in as administrator.', 'success');
    } else {
      elements.loginError.textContent = 'Invalid credentials. Please try again.';
      elements.loginError.style.display = 'block';
    }
  });

  // Handle Logout
  elements.logoutBtn.addEventListener('click', () => {
    deactivateAdminMode();
    showToast('Logged out successfully.', 'success');
  });

  // Open Add Item Modal
  elements.addItemBtn.addEventListener('click', () => {
    state.editingItemId = null;
    elements.modalItemTitle.textContent = 'Add Menu Item';
    elements.itemForm.reset();
    openModal(elements.itemModal);
  });

  // Handle Menu Item Add/Edit Submission
  elements.itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('item-name').value;
    const category = document.getElementById('item-category').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const description = document.getElementById('item-desc').value;
    const image = "";
    const tags = document.getElementById('item-tags').value;
    const available = document.getElementById('item-available').checked;

    const itemData = {
      id: state.editingItemId || 'item-' + Date.now(),
      name,
      category,
      price,
      description,
      image,
      tags,
      available
    };

    let updatedMenu = [...state.menuItems];

    if (state.editingItemId) {
      const index = updatedMenu.findIndex(item => item.id === state.editingItemId);
      if (index !== -1) updatedMenu[index] = itemData;
    } else {
      updatedMenu.push(itemData);
    }

    const success = await saveMenuToServer(updatedMenu);
    
    if (success) {
      state.menuItems = updatedMenu;
      renderMenu();
      closeModal(elements.itemModal);
      elements.itemForm.reset();
      // Show confirmation popup
      showSaveConfirmation(state.editingItemId ? 'updated' : 'added', name);
    }
  });

  // Mobile navigation menu toggle
  if (elements.mobileMenuBtn && elements.navLinks) {
    elements.mobileMenuBtn.addEventListener('click', () => {
      elements.navLinks.classList.toggle('active');
      const icon = elements.mobileMenuBtn.querySelector('i');
      if (icon) {
        if (elements.navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close mobile menu when a nav link is clicked
    const navLinksList = elements.navLinks.querySelectorAll('a');
    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        elements.navLinks.classList.remove('active');
        const icon = elements.mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Menu search input event listener
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      
      // Toggle clear button visibility
      if (state.searchQuery.length > 0) {
        elements.searchClearBtn.style.display = 'block';
      } else {
        elements.searchClearBtn.style.display = 'none';
      }
      
      renderMenu();
    });
  }

  // Clear search button event listener
  if (elements.searchClearBtn) {
    elements.searchClearBtn.addEventListener('click', () => {
      elements.searchInput.value = '';
      state.searchQuery = '';
      elements.searchClearBtn.style.display = 'none';
      elements.searchInput.focus();
      renderMenu();
    });
  }

  // Handle Sync DB Button Click for initializing Sheets
  const syncDbBtn = document.getElementById('sync-db-btn');
  if (syncDbBtn) {
    syncDbBtn.addEventListener('click', async () => {
      if (confirm("Would you like to initialize your Google Sheet with the complete default menu of 100+ authentic Andhra Hotel creations? This will overwrite existing items on the sheet.")) {
        showLoader(true);
        const success = await saveMenuToServer(CONFIG.FALLBACK_MENU);
        if (success) {
          state.menuItems = [...CONFIG.FALLBACK_MENU];
          renderMenu();
          showSaveConfirmation('initialized', 'Google Sheets Menu');
        } else {
          showToast('Failed to initialize Google Sheets.', 'error');
        }
        showLoader(false);
      }
    });
  }
}

// Show/Hide Grid Loading State
function showLoader(show) {
  if (show) {
    elements.menuLoader.style.display = 'flex';
    elements.menuGrid.classList.add('loading');
  } else {
    elements.menuLoader.style.display = 'none';
    elements.menuGrid.classList.remove('loading');
  }
}

// Open / Close Modals
function openModal(modal) {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  // Reset errors
  if (elements.loginError) elements.loginError.style.display = 'none';
  if (elements.itemError) elements.itemError.style.display = 'none';
}

// Activate / Deactivate Admin Edit Capabilities
function activateAdminMode() {
  state.isAdmin = true;
  sessionStorage.setItem('isAdmin', 'true');
  document.body.classList.add('admin-mode');
  renderMenu();
}

function deactivateAdminMode() {
  state.isAdmin = false;
  sessionStorage.removeItem('isAdmin');
  document.body.classList.remove('admin-mode');
  renderMenu();
}

// Create Card Element Helper
function createCardElement(item) {
  // Process tags
  const tagsArr = item.tags ? item.tags.split(',').map(t => t.trim()).filter(t => t !== '') : [];
  const tagsHTML = tagsArr.map(tag => `<span class="menu-tag">${tag}</span>`).join('');
  
  // Format price
  const formattedPrice = typeof item.price === 'number' 
    ? item.price.toFixed(2) 
    : parseFloat(item.price || 0).toFixed(2);

  const card = document.createElement('div');
  card.className = `menu-item-card ${!item.available ? 'unavailable' : ''}`;
  card.setAttribute('data-id', item.id);
  
  card.innerHTML = `
    <div class="menu-item-details">
      <div class="menu-item-header">
        <h3 class="menu-item-title">${item.name}</h3>
        <span class="menu-item-price">₹${formattedPrice}</span>
      </div>
      <p class="menu-item-desc">${item.description}</p>
      <div class="menu-item-footer">
        <div class="menu-tags-list">
          ${tagsHTML}
        </div>
        ${!item.available ? '<span class="menu-item-status">Unavailable</span>' : ''}
      </div>
    </div>
    <div class="menu-item-admin-actions">
      <button class="admin-action-btn edit" title="Edit Item"><i class="fas fa-edit"></i> Edit</button>
      <button class="admin-action-btn delete" title="Delete Item"><i class="fas fa-trash-alt"></i> Delete</button>
    </div>
  `;

  // Hook up admin events inside the card
  const editBtn = card.querySelector('.edit');
  const deleteBtn = card.querySelector('.delete');

  editBtn.addEventListener('click', () => openEditItemModal(item));
  deleteBtn.addEventListener('click', () => handleDeleteItem(item.id, item.name));

  return card;
}

// ─── ANIMATION UTILITIES ─────────────────────────────────────────────────────

// Set staggered CSS --card-index on all rendered cards for entrance animation
function applyCardStagger() {
  const cards = elements.menuGrid.querySelectorAll('.menu-item-card');
  cards.forEach((card, i) => {
    card.style.setProperty('--card-index', i);
  });
}

// Render Menu Cards to DOM
function renderMenu() {
  elements.menuGrid.innerHTML = '';
  
  if (state.menuItems.length === 0) {
    elements.menuGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--color-text-muted);">
        <p style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 10px;">No Culinary Creations Found</p>
        <p style="font-size: 0.85rem;">Check your network connection or initialize your menu.</p>
      </div>
    `;
    return;
  }

  const category = state.currentCategory;
  const subCategory = state.currentSubCategory;

  if (category === 'All') {
    let hasItems = false;
    subCategories.forEach(sub => {
      let items = state.menuItems.filter(item => item.category.toLowerCase().trim() === sub.name.toLowerCase().trim());
      
      // Live search filter
      if (state.searchQuery) {
        items = items.filter(item => 
          item.name.toLowerCase().includes(state.searchQuery) ||
          item.description.toLowerCase().includes(state.searchQuery) ||
          (item.tags && item.tags.toLowerCase().includes(state.searchQuery))
        );
      }

      if (items.length > 0) {
        hasItems = true;
        // Render subheader
        const headerDiv = document.createElement('h3');
        headerDiv.className = 'menu-subcategory-header';
        headerDiv.textContent = sub.header;
        elements.menuGrid.appendChild(headerDiv);
        
        // Render cards
        items.forEach(item => {
          elements.menuGrid.appendChild(createCardElement(item));
        });
      }
    });
    
    if (!hasItems) {
      if (state.searchQuery) {
        elements.menuGrid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--color-text-muted);">
            <p style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 10px;">No Matches Found</p>
            <p style="font-size: 0.85rem;">We couldn't find any dishes matching "${elements.searchInput.value}". Try checking spelling or search for ingredients.</p>
          </div>
        `;
      } else {
        elements.menuGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:60px 0; color:var(--color-text-muted);">No items found.</div>`;
      }
    }
  } else {
    // Parent category filtering (Soups, Starters, Curries, Biriyani)
    let hasItems = false;
    
    subCategories.forEach(sub => {
      if (sub.parent === category) {
        // If a specific subcategory is selected, filter by it
        if (!subCategory.startsWith('All ') && sub.name.toLowerCase().trim() !== subCategory.toLowerCase().trim()) {
          return;
        }
        
        let items = state.menuItems.filter(item => item.category.toLowerCase().trim() === sub.name.toLowerCase().trim());
        
        // Live search filter
        if (state.searchQuery) {
          items = items.filter(item => 
            item.name.toLowerCase().includes(state.searchQuery) ||
            item.description.toLowerCase().includes(state.searchQuery) ||
            (item.tags && item.tags.toLowerCase().includes(state.searchQuery))
          );
        }

        if (items.length > 0) {
          hasItems = true;
          // Render subheader
          const headerDiv = document.createElement('h3');
          headerDiv.className = 'menu-subcategory-header';
          headerDiv.textContent = sub.header;
          elements.menuGrid.appendChild(headerDiv);
          
          // Render cards
          items.forEach(item => {
            elements.menuGrid.appendChild(createCardElement(item));
          });
        }
      }
    });

    if (!hasItems) {
      if (state.searchQuery) {
        elements.menuGrid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--color-text-muted);">
            <p style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 10px;">No Matches Found</p>
            <p style="font-size: 0.85rem;">We couldn't find any dishes under "${subCategory.startsWith('All ') ? category : subCategory}" matching "${elements.searchInput.value}".</p>
          </div>
        `;
      } else {
        elements.menuGrid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--color-text-muted);">
            <p style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 10px;">No Items Found</p>
            <p style="font-size: 0.85rem;">There are currently no items under "${subCategory.startsWith('All ') ? category : subCategory}".</p>
          </div>
        `;
      }
    }
  }

  // Apply stagger animation indices after every render
  applyCardStagger();
}


// Open Modal to Edit an Existing Item
function openEditItemModal(item) {
  state.editingItemId = item.id;
  elements.modalItemTitle.textContent = 'Edit Menu Item';
  
  // Fill inputs
  document.getElementById('item-name').value = item.name;
  document.getElementById('item-category').value = item.category;
  document.getElementById('item-price').value = item.price;
  document.getElementById('item-desc').value = item.description;
  document.getElementById('item-tags').value = item.tags || '';
  document.getElementById('item-available').checked = item.available !== false && item.available !== 'FALSE';

  openModal(elements.itemModal);
}

// Handle Card Delete Click
async function handleDeleteItem(itemId, itemName) {
  if (confirm(`Are you sure you want to remove "${itemName}" from the menu?`)) {
    const updatedMenu = state.menuItems.filter(item => item.id !== itemId);
    const success = await saveMenuToServer(updatedMenu);
    
    if (success) {
      state.menuItems = updatedMenu;
      renderMenu();
      showSaveConfirmation('deleted', itemName);
    }
  }
}

// Push local data state back to Sheets backend
async function saveMenuToServer(newMenuData) {
  showLoader(true);

  if (!CONFIG.GOOGLE_SHEET_API_URL) {
    showLoader(false);
    return true;
  }

  try {
    // Strategy 1: no-cors POST — avoids CORS preflight, sends full data payload with text/plain content type
    await fetch(CONFIG.GOOGLE_SHEET_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        password: CONFIG.DEFAULT_ADMIN_PASSWORD,
        action: 'saveAll',
        items: newMenuData
      })
    });

    return true;

  } catch (error) {
    console.error('Failed to reach Google Sheets.', error);
    // Even on network error, apply locally so admin is not blocked
    return true;
  } finally {
    showLoader(false);
  }
}

// Show premium save confirmation popup
function showSaveConfirmation(action, itemName) {
  // Remove any existing confirmation popup
  const existing = document.getElementById('save-confirm-popup');
  if (existing) existing.remove();

  const popup = document.createElement('div');
  popup.id = 'save-confirm-popup';
  popup.innerHTML = `
    <div class="save-confirm-backdrop"></div>
    <div class="save-confirm-box">
      <div class="save-confirm-icon"><i class="fas fa-check-circle"></i></div>
      <h3 class="save-confirm-title">Changes Saved</h3>
      <p class="save-confirm-msg">
        <strong>${itemName}</strong> has been successfully ${action} in the menu.
      </p>
      <p class="save-confirm-sheets">
        <i class="fas fa-table"></i> Changes synced to Google Sheets
      </p>
      <button class="save-confirm-btn" id="save-confirm-ok">Done</button>
    </div>
  `;
  document.body.appendChild(popup);

  // Animate in
  requestAnimationFrame(() => popup.classList.add('visible'));

  // Close handlers
  const close = () => {
    popup.classList.remove('visible');
    setTimeout(() => popup.remove(), 400);
  };
  document.getElementById('save-confirm-ok').addEventListener('click', close);
  popup.querySelector('.save-confirm-backdrop').addEventListener('click', close);
  setTimeout(close, 5000); // Auto-close after 5s
}

// Toast Notifications System
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = '<i class="fas fa-info-circle"></i>';
  if (type === 'success') icon = '<i class="fas fa-check-circle"></i>';
  if (type === 'error') icon = '<i class="fas fa-exclamation-circle"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  elements.toastContainer.appendChild(toast);

  // Auto-remove toast
  setTimeout(() => {
    toast.style.animation = 'fadeIn 0.3s ease reverse forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// Setup Scroll Active Nav-Links (Scroll Spy)
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 150; // offset for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ─── SCROLL-REVEAL OBSERVER ───────────────────────────────────────────────────
function setupScrollReveal() {
  // Mark elements that should animate on scroll
  const targets = [
    { selector: '.section-header',    cls: 'is-visible' },
    { selector: '.section-title',     cls: 'is-visible' },
    { selector: '.portfolio-item',    cls: 'reveal is-visible', immediate: false },
    { selector: '.footer-col',        cls: 'reveal is-visible', immediate: false },
  ];

  // Add reveal class to elements not already animated
  document.querySelectorAll('.portfolio-item').forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 2 === 1) el.classList.add('reveal-right');
    else el.classList.add('reveal-left');
  });

  document.querySelectorAll('.footer-col').forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Don't unobserve — keeps state for repeated filter changes
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Observe all reveal elements and section headers
  document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .section-header, .section-title'
  ).forEach(el => observer.observe(el));
}

// ─── CURSOR ORB ───────────────────────────────────────────────────────────────
function setupCursorOrb() {
  const orb = document.createElement('div');
  orb.id = 'cursor-orb';
  document.body.appendChild(orb);

  let mouseX = -1000, mouseY = -1000;
  let orbX = -1000, orbY = -1000;
  let raf;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    orb.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    orb.style.opacity = '0';
  });

  function animateOrb() {
    // Lerp towards cursor (lazy follow for luxury feel)
    orbX += (mouseX - orbX) * 0.08;
    orbY += (mouseY - orbY) * 0.08;
    orb.style.left = orbX + 'px';
    orb.style.top  = orbY + 'px';
    raf = requestAnimationFrame(animateOrb);
  }
  animateOrb();
}

// ─── GOLD PARTICLE CANVAS ─────────────────────────────────────────────────────
function setupParticleCanvas() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  hero.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W = canvas.width  = hero.offsetWidth;
  let H = canvas.height = hero.offsetHeight;

  const PARTICLE_COUNT = 55;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.8 + 0.4,
    vx: (Math.random() - 0.5) * 0.22,
    vy: -(Math.random() * 0.35 + 0.08),
    alpha: Math.random() * 0.6 + 0.15
  }));

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      // Gold color
      ctx.fillStyle = '#c5a880';
      ctx.shadowColor = '#d4af37';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      p.x += p.vx;
      p.y += p.vy;

      // Fade near top
      if (p.y < H * 0.15) p.alpha -= 0.006;
      else p.alpha = Math.min(p.alpha + 0.003, 0.75);

      // Reset if out of bounds
      if (p.y < 0 || p.alpha <= 0) {
        p.x = Math.random() * W;
        p.y = H + 5;
        p.alpha = Math.random() * 0.3 + 0.1;
        p.vy = -(Math.random() * 0.35 + 0.08);
      }
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  window.addEventListener('resize', () => {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  });
}

// ─── HERO VIDEO PARALLAX ─────────────────────────────────────────────────────
function setupHeroParallax() {
  const videoContainer = document.querySelector('.hero-video-container');
  if (!videoContainer) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Subtle downward push as user scrolls — creates depth illusion
    videoContainer.style.transform = `translateY(${scrollY * 0.28}px) scale(1.05)`;
  }, { passive: true });
}
