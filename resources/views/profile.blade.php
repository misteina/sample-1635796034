<x-layout>
    <x-slot name="title">Profile</x-slot>
    <div id="profile">
        <span>Welcome, <b>{{ ucwords($name) }}</b></span>
        <div><a href="/logout">Logout</a></div>
    </div>
    <x-slot name="script">
        <script src="{{ mix('js/profile.js') }}"></script>
    </x-slot>
</x-layout>