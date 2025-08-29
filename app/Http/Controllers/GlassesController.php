<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGlassesRequest;
use App\Http\Requests\UpdateGlassesRequest;
use App\Models\Glasses;
use Inertia\Inertia;

class GlassesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $glasses = Glasses::with(['sales' => function ($query) {
            $query->latest()->take(5);
        }])
        ->withCount('sales')
        ->latest()
        ->paginate(12);

        return Inertia::render('glasses/index', [
            'glasses' => $glasses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('glasses/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGlassesRequest $request)
    {
        $glasses = Glasses::create($request->validated());

        return redirect()->route('glasses.show', $glasses)
            ->with('success', 'Glasses product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Glasses $glasses)
    {
        $glasses->load(['sales' => function ($query) {
            $query->latest()->with('glasses:id,model_name,brand');
        }]);

        return Inertia::render('glasses/show', [
            'glasses' => $glasses
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Glasses $glasses)
    {
        return Inertia::render('glasses/edit', [
            'glasses' => $glasses
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGlassesRequest $request, Glasses $glasses)
    {
        $glasses->update($request->validated());

        return redirect()->route('glasses.show', $glasses)
            ->with('success', 'Glasses product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Glasses $glasses)
    {
        $glasses->delete();

        return redirect()->route('glasses.index')
            ->with('success', 'Glasses product deleted successfully.');
    }
}