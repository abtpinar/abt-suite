<?php

namespace App\Data\Entities\Traits;

use Illuminate\Support\Facades\File;

trait TaxImageFunctions
{
    public static function boot()
    {
        parent::boot();

        static::creating(
            function ($record) {
                $record->savePicture();
            }
        );

        static::updating(
            function ($record) {
                $record->savePicture();
            }
        );
    }

    /**
     * @return string
     */
    public function getTaxImageAttribute()
    {
        $pictureId = $this->getPictureId($this->attributes['tax_image']);

        return $this->attributes['tax_image'] && file_exists($pictureId) ? file_get_contents($pictureId) : '';
    }

    /**
     * Gets the relative path to the picture identified as specified.
     *
     * @param $pictureId : The id of the Picture to build its relative path.
     * @return string: Which is the relative path to the picture identified by the given id.
     */
    public function getPictureId($pictureId): string
    {
        $this->refreshFoldersPath();

        return $this->picturePath . $pictureId;
    }

    private function refreshFoldersPath()
    {
        if (!file_exists($this->entityUploadPath) && !empty($this->entityUploadPath)) {
            @mkdir($this->entityUploadPath);
        }

        if (!file_exists($this->entityImagesUploadPath) && !empty($this->entityImagesUploadPath)) {
            @mkdir($this->entityImagesUploadPath);
        }
    }

    /**
     * Save Client image.
     * @throws \Exception
     */
    public function savePicture()
    {
        $taxImage = @$this->attributes['tax_image'];
        $trasheableImage = @$this->original['tax_image'];

        if (isset($trasheableImage) && $taxImage !== $trasheableImage) {
            $trasheableImage = public_path($this->getPictureId($trasheableImage));
        }

        if (isset($taxImage) && !empty($taxImage) && strpos($taxImage, 'data:') === 0) {
            $pictureId = bin2hex(random_bytes(10));
            $imageId = $this->getPictureId($pictureId);

            $handle = fopen($imageId, 'w');
            fwrite($handle, $taxImage);
            fclose($handle);

            $this->attributes['tax_image'] = $pictureId;
        }

        if (isset($trasheableImage) && File::exists($trasheableImage)) {
            File::delete($trasheableImage);
        }
    }

    /**
     * Delete the Client's image.
     */
    public function deletePicture()
    {
        if (!empty($this->attributes['tax_image']) &&
            file_exists($file = $this->getPictureId($this->attributes['tax_image']))) {
            @unlink($file);
        }
    }
}