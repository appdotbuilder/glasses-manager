<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Sale
 *
 * @property int $id
 * @property int $glasses_id
 * @property string $sale_date
 * @property int $quantity
 * @property string $unit_price
 * @property string $total_price
 * @property string|null $customer_name
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Glasses $glasses
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Sale newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sale newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sale query()
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereCustomerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereGlassesId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereSaleDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereTotalPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale forMonth($year, $month)
 * @method static \Database\Factories\SaleFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Sale extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'glasses_id',
        'sale_date',
        'quantity',
        'unit_price',
        'total_price',
        'customer_name',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sale_date' => 'date',
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'sales';

    /**
     * Get the glasses product that was sold.
     *
     * @return BelongsTo
     */
    public function glasses(): BelongsTo
    {
        return $this->belongsTo(Glasses::class);
    }

    /**
     * Scope a query to only include sales for a specific month.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $year
     * @param  int  $month
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForMonth($query, int $year, int $month)
    {
        return $query->whereYear('sale_date', $year)
                    ->whereMonth('sale_date', $month);
    }
}