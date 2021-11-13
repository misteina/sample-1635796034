<x-layout>
    <x-slot name="title">Profile</x-slot>
    <div id="profile">
        <span>Welcome, <b>{{ ucwords($name) }}</b></span>
        <span><a href="/logout">Logout</a></span>
    </div>
    <x-slot name="script">
        <script src="{{ mix('js/profile.js') }}"></script>
    </x-slot>
</x-layout>