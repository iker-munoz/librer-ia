<script lang="ts">
  import { enhance } from "$app/forms";
  import type { User } from "$lib/schemas/user";

  let { data, form }: { data: any, form: any } = $props();
  
  let search = $state("");
  let showDropdown = $state(false);
  let showModalState = $state(false);
  
  let filtered = $derived(
    (data.users || []).filter((u: User) => u.username.toLowerCase().includes(search.toLowerCase())),
  );

  function selectUser(user: User) {
    search = user.username;
    showDropdown = false;
  }
  
  function showModal() {
    showModalState = true;
  }

  function cerrarModal() {
    showModalState = false;
  }
</script>

<div class="users-container">
  <h1>Users</h1>
  <div class="users-content">
    <div class="search">
      <input
        class="users-input"
        type="text"
        placeholder="Search users..."
        bind:value={search}
        onfocus={() => (showDropdown = true)}
        onblur={() => setTimeout(() => (showDropdown = false), 150)}
      />
      {#if showDropdown && filtered.length > 0}
        <ul class="dropdown">
          {#each filtered as user}
            <li class="users-list">
              <span 
                role="button" 
                tabindex="0" 
                onmousedown={() => selectUser(user)}
                onkeydown={(e) => { if (e.key === 'Enter') selectUser(user) }}
              >{user.username}</span>
              <form method="POST" action="?/delete" use:enhance>
                <input type="hidden" name="uuid" value={user.uuid} />
                <button type="submit" class="btn-delete">x</button>
              </form>
            </li>
          {/each}
        </ul>
      {/if}
      <button class="add-user-button" onclick={showModal}>+</button>
    </div>
    
    {#if form?.error}
      <p style="color: #ff6b6b; font-size: 14px;">{form.error}</p>
    {/if}
    {#if form?.success}
      <p style="color: #51cf66; font-size: 14px;">Action completed successfully!</p>
    {/if}

    {#if showModalState}
      <div class="overlay">
        <div class="modal">
          <div class="modal-header">
            <p style="font-weight: bold;">Add new user</p>
            <p>Enter the details for the new user</p>

            <form method="POST" action="?/create" use:enhance={() => {
              return async ({ update }) => {
                await update();
                cerrarModal();
              };
            }}>
              <div class="modal-form">
                <label for="username">Username</label>
                <input
                  id="username"
                  name="username"
                  class="users-input"
                  type="text"
                  placeholder="e.g Ana Garcia"
                  required
                />
                <label for="password">Password</label>
                <input 
                  id="password"
                  name="password"
                  class="users-input" 
                  type="password" 
                  required
                />
              </div>

              <div class="modal-btn" style="margin-top: 15px;">
                <button type="button" class="btn" onclick={cerrarModal}>Cancel</button>
                <button type="submit" class="btn">Add User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .users-container {
    width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .users-input {
    background-color: #151515;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #2a2a2a;
    border-radius: 6px;
    color: #f0f0f0;
    box-sizing: border-box;
    outline: none;
  }

  .users-input:focus {
    border-color: #444;
  }

  .search {
    display: flex;
    gap: 8px;
    position: relative;
  }

  .add-user-button {
    background: #f0f0f0;
    color: #000;
    border: none;
    border-radius: 6px;
    width: 34px;
    height: 34px;
    font-size: 1.2rem;
    cursor: pointer;
    flex-shrink: 0;
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    background: #151515;
    border: 1px solid #2a2a2a;
    border-radius: 6px;
    list-style: none;
    margin: 0;
    padding: 4px;
    width: calc(100% - 42px);
    z-index: 10;
  }

  .users-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    color: #e0e0e0;
  }

  .users-list:hover {
    background: #202020;
  }

  .btn-delete {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .btn-delete:hover {
    color: #ff6b6b;
    background: #2a2a2a;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    width: 400px;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    background: #151515;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 101;
  }

  .modal-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .modal-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid #505050;
    padding-top: 10px;
    padding-bottom: 5px;
  }

  .modal-btn {
    display: flex;
    gap: 10px;
  }

  .btn {
    border-radius: 6px;
    height: 36px;
    flex: 1;
    border: 1px solid #2a2a2a;
    background: #1a1a1a;
    color: #f0f0f0;
    cursor: pointer;
    font-size: 14px;
  }
  .btn:first-child {
    background-color: #f0f0f0;
    color: #000;
  }

  .btn:hover {
    background: #222;
  }
</style>
