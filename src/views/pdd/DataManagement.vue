<script setup>
// Komponen Data Management PDD
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-purple-400 mb-6">Data Management</h1>
    
    <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <table class="w-full text-left text-sm">
        <thead class="bg-purple-500/10 text-purple-300">
          <tr>
            <th class="p-4">Nama Peserta</th>
            <th class="p-4">Program</th>
            <th class="p-4">Status</th>
          </tr>
        </thead>
        <tbody class="text-gray-300">
          <tr class="border-t border-white/5">
            <td class="p-4">Dimas Sultan</td>
            <td class="p-4">Web Development</td>
            <td class="p-4">
              <span class="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Aktif</span>
            </td>
          </tr>
          <tr class="border-t border-white/5">
            <td class="p-4">Faraz Setya</td>
            <td class="p-4">Machine Learning</td>
            <td class="p-4">
              <span class="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Aktif</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>