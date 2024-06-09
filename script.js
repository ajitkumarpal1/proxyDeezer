document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu');
    const screen = document.getElementById('screen');
    const screenContent = document.getElementById('screenContent');
    const backButton = document.getElementById('backButton');
    const menuButton = document.getElementById('menuButton');
    const menuItems = menu.querySelectorAll('button');
    let selectedOption = 0;
  
    const updateMenu = () => {
      menuItems.forEach((item, index) => {
        if (index === selectedOption) {
          item.classList.add('bg-gray-600');
        } else {
          item.classList.remove('bg-gray-600');
        }
      });
    };
  
    const handleMenuClick = async () => {
      const selectedText = menuItems[selectedOption].textContent;
      menu.classList.add('hidden');
      screen.classList.remove('hidden');
  
      if (selectedText === 'Music') {
        const musicData = await fetchMusicData();
        displayMusicData(musicData);
      } else {
        screenContent.textContent = `${selectedText} Screen`;
      }
    };
  
    const handleBackToMenu = () => {
      screen.classList.add('hidden');
      menu.classList.remove('hidden');
    };
  
    menuItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        selectedOption = index;
        handleMenuClick();
      });
    });
  
    backButton.addEventListener('click', handleBackToMenu);
  
    let startAngle = 0;
    let currentAngle = 0;
    let isMouseDown = false;
  
    const handleMouseMove = (e) => {
      if (!isMouseDown) return;
      const center = menuButton.getBoundingClientRect();
      const x = e.clientX - (center.left + center.width / 2);
      const y = e.clientY - (center.top + center.height / 2);
      currentAngle = Math.atan2(y, x) * (180 / Math.PI);
      const deltaAngle = currentAngle - startAngle;
  
      if (deltaAngle > 10) {
        selectedOption = (selectedOption + 1) % menuItems.length;
        updateMenu();
        startAngle = currentAngle;
      } else if (deltaAngle < -10) {
        selectedOption = (selectedOption - 1 + menuItems.length) % menuItems.length;
        updateMenu();
        startAngle = currentAngle;
      }
    };
  
    menuButton.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      startAngle = currentAngle;
      e.preventDefault();
    });
  
    document.addEventListener('mouseup', () => {
      isMouseDown = false;
    });
  
    document.addEventListener('mousemove', handleMouseMove);
  
    updateMenu();
  
    const fetchMusicData = async () => {
      try {
        const response = await fetch('https://api.deezer.com/chart');
        const data = await response.json();
        return data.tracks.data;
      } catch (error) {
        console.error('Error fetching music data:', error);
        return [];
      }
    };
  
    const displayMusicData = (musicData) => {
      screenContent.innerHTML = '<h2 class="text-xl font-semibold mb-4">Music</h2>';
      musicData.forEach((track) => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('mb-4', 'p-2', 'bg-gray-700', 'rounded-lg', 'flex');
        trackElement.innerHTML = `
          <img src="${track.album.cover}" alt="${track.title}" class="w-12 h-12 object-cover rounded-lg mr-4">
          <div>
            <p class="text-lg">${track.title}</p>
            <p class="text-gray-400">${track.artist.name}</p>
          </div>
        `;
        screenContent.appendChild(trackElement);
      });
    };
  });
  