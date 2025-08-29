<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Glasses
 *
 * @property int $id
 * @property string $model_name
 * @property string $brand
 * @property string $purchase_price
 * @property string $selling_price
 * @property int $stock_quantity
 * @property int $low_stock_threshold
 * @property string|null $description
 * @property string|null $frame_type
 * @property string|null $frame_material
 * @property string|null $lens_type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Sale> $sales
 * @property-read int|null $sales_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses query()
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses whereBrand($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses whereFrameMaterial($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses whereFrameType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses whereLensType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses whereLowStockThreshold($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses whereModelName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses wherePurchasePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses whereSellingPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses whereStockQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Glasses lowStock()
 * @method static \Database\Factories\GlassesFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Glasses extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'model_name',
        'brand',
        'purchase_price',
        'selling_price',
        'stock_quantity',
        'low_stock_threshold',
        'description',
        'frame_type',
        'frame_material',
        'lens_type',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'purchase_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'stock_quantity' => 'integer',
        'low_stock_threshold' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'glasses';

    /**
     * Get all sales for this glasses product.
     *
     * @return HasMany
     */
    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class);
    }

    /**
     * Scope a query to only include glasses with low stock.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLowStock($query)
    {
        return $query->whereColumn('stock_quantity', '<=', 'low_stock_threshold');
    }

    /**
     * Check if this glasses product is low on stock.
     *
     * @return bool
     */
    public function isLowStock(): bool
    {
        return $this->stock_quantity <= $this->low_stock_threshold;
    }

    /**
     * Reduce stock quantity after a sale.
     *
     * @param int $quantity
     * @return bool
     */
    public function reduceStock(int $quantity): bool
    {
        if ($this->stock_quantity >= $quantity) {
            $this->stock_quantity -= $quantity;
            return $this->save();
        }
        return false;
    }
}