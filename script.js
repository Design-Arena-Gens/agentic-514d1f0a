// Tab switching functionality
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs and code blocks
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.code-block').forEach(block => block.classList.remove('active'));

        // Add active class to clicked tab
        btn.classList.add('active');

        // Show corresponding code block
        const tabName = btn.dataset.tab;
        document.getElementById(`${tabName}-code`).classList.add('active');
    });
});

// Button click handlers with visual feedback
document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const name = card.querySelector('.name').textContent;
        showNotification(`Editing ${name}`, 'info');
    });
});

document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const name = card.querySelector('.name').textContent;

        if (confirm(`Are you sure you want to delete ${name}?`)) {
            card.style.transition = 'all 0.3s ease';
            card.style.transform = 'translateX(100%)';
            card.style.opacity = '0';

            setTimeout(() => {
                card.remove();
                showNotification(`${name} deleted`, 'error');
            }, 300);
        }
    });
});

// Download functionality
function downloadFiles() {
    const layoutXML = `<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="12dp"
    app:cardCornerRadius="16dp"
    app:cardElevation="8dp"
    android:elevation="4dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="20dp"
        android:background="@android:color/white">

        <!-- Header Section -->
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            android:gravity="center_vertical"
            android:paddingBottom="12dp">

            <TextView
                android:id="@+id/tv_name"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:text="Name"
                android:textStyle="bold"
                android:textSize="18sp"
                android:textColor="#1A1A1A"
                android:ellipsize="end"
                android:maxLines="1"
                android:letterSpacing="0.01"/>

            <TextView
                android:id="@+id/tv_status"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Active"
                android:textSize="14sp"
                android:textColor="@android:color/white"
                android:background="@drawable/status_background"
                android:paddingStart="12dp"
                android:paddingEnd="12dp"
                android:paddingTop="6dp"
                android:paddingBottom="6dp"
                android:layout_marginStart="12dp"/>

        </LinearLayout>

        <!-- Divider -->
        <View
            android:layout_width="match_parent"
            android:layout_height="1dp"
            android:background="#E0E0E0"
            android:layout_marginTop="8dp"
            android:layout_marginBottom="12dp"/>

        <!-- Content Section -->
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical">

            <TextView
                android:id="@+id/tv_description"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Description"
                android:textSize="14sp"
                android:textColor="#666666"
                android:lineSpacingExtra="4dp"
                android:maxLines="2"
                android:ellipsize="end"/>

            <!-- Action Buttons -->
            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="horizontal"
                android:gravity="end"
                android:layout_marginTop="16dp">

                <Button
                    android:id="@+id/btn_edit"
                    android:layout_width="wrap_content"
                    android:layout_height="36dp"
                    android:text="Edit"
                    android:textSize="14sp"
                    android:textColor="#2196F3"
                    android:background="?attr/selectableItemBackground"
                    android:paddingStart="16dp"
                    android:paddingEnd="16dp"
                    style="?android:attr/borderlessButtonStyle"/>

                <Button
                    android:id="@+id/btn_delete"
                    android:layout_width="wrap_content"
                    android:layout_height="36dp"
                    android:text="Delete"
                    android:textSize="14sp"
                    android:textColor="#F44336"
                    android:background="?attr/selectableItemBackground"
                    android:paddingStart="16dp"
                    android:paddingEnd="16dp"
                    android:layout_marginStart="8dp"
                    style="?android:attr/borderlessButtonStyle"/>

            </LinearLayout>

        </LinearLayout>

    </LinearLayout>

</androidx.cardview.widget.CardView>`;

    const statusBackgroundXML = `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">

    <solid android:color="#4CAF50"/>

    <corners android:radius="20dp"/>

    <padding
        android:left="8dp"
        android:right="8dp"
        android:top="4dp"
        android:bottom="4dp"/>

</shape>`;

    // Download layout file
    downloadFile('item_layout.xml', layoutXML);

    // Download drawable file
    setTimeout(() => {
        downloadFile('status_background.xml', statusBackgroundXML);
        showNotification('XML files downloaded successfully!', 'success');
    }, 100);
}

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    const colors = {
        info: '#2196F3',
        success: '#4CAF50',
        error: '#F44336'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${colors[type]};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0,0,0,0.1);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

console.log('Redesigned Android Card Layout loaded successfully! 🎨');
