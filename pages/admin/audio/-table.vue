<template>
  <v-layout column>
    <sv-data-table :headers="headers" v-bind="$attrs" class="mt-3" @fetch="$emit('fetch')">
    </sv-data-table>
  </v-layout>
</template>
<script>
export default {
  name: 'AudioList',
  data() {
    return {
      headers,
    }
  },
}
const headers = [
  { text: 'audio', value: 'index',  sortable: false },
  {
    text: 'visibility',
    value: 'audio',
    width: 150,
    sortable: false,
  },
  {
    text: 'date',
    value: 'requiredDate',
    width: 150,
    sort: (a, b) => a.seconds - b.seconds,
  },
  {
    text: 'view',
    value: 'reason',
    sortable: true,
    width: 150
  },
  {
    text: 'comment',
    value: 'type',
    width: 150,
    sortable: true
  },
  {
    text: 'actions',
    value: '',
    width: 150
  },
]
</script>
