<script lang="ts">
  let users = $state(["Manolo", "Ana García", "Pedro López"]);
  let search = $state("");
  let showDropdown = $state(false);

  let filtered = $derived(
    users.filter((u) => u.toLowerCase().includes(search.toLowerCase())),
  );

  function selectUser(user: string) {
    search = user;
    showDropdown = false;
  }
  function showModal() {
    const modal = document.querySelector(".overlay") as HTMLElement;
    modal.style.display = "flex";
  }

  function cerrarModal() {
    const overlay = document.querySelector(".overlay") as HTMLElement;
    overlay.style.display = "none";
  }
  let newUsername = $state("");
  function addUser() {
    /*Si el username es vacio o tiene solo espacios no retorna nada*/
    if (newUsername.trim() === "") return;
    users.push(newUsername);
    newUsername = "";
    cerrarModal();
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
        /*Enlaza el input con la variable del script*/
        bind:value={search}
        /*Se abre el dropdown al hacer clic*/
        onfocus={() => (showDropdown = true)}
        /*Cierra del dropdown al salir*/
        onblur={() => setTimeout(() => (showDropdown = false), 150)}
      />
      <!--Se muestra el dropdown solo si es true  y hay usuarios filtrados-->
      {#if showDropdown && filtered.length > 0}
        <ul class="dropdown">
          <!--Se recorre el array de users -->
          {#each filtered as user}
            <li class="users-list">
              <span onmousedown={() => selectUser(user)}>{user}</span>
              <button class="btn-delete">x</button>
            </li>
          {/each}
        </ul>
      {/if}
      <button class="add-user-button" onclick={showModal}>+</button>
    </div>
    <div class="overlay">
      <div class="modal">
        <div class="modal-header">
          <p style="font-weight: bold;">Add new user</p>
          <p>Enter the details for the new user</p>

          <div class="modal-form">
            <label for="username">Username</label>
            <input
              class="users-input"
              type="text"
              placeholder="e.g Ana Garcia"
              bind:value={newUsername}
            />
            <label for="password">Password</label>
            <input class="users-input" type="password" />
          </div>
        </div>

        <div class="modal-btn">
          <button class="btn" onclick={cerrarModal}>Cancel</button>
          <button class="btn" onclick={addUser}>Add User</button>
        </div>
      </div>
    </div>
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
    color: #f0f0f0;
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
    display: none;
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
