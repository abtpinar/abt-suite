<?php

namespace App\Data\Entities\Traits;

trait ImageFunctions
{
    /**
     * @var string
     */
    private $userPicturePath = 'upload/users/pictures/';

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
    public function getPictureAttribute()
    {
        $pictureId = $this->getPictureId($this->attributes['picture']);

        return $this->attributes['picture'] && file_exists($pictureId) ? file_get_contents($pictureId) : '';
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

        return $this->userPicturePath . $pictureId;
    }

    private function refreshFoldersPath()
    {
        if (!file_exists('upload/users')) {
            mkdir('upload/users');
        }

        if (!file_exists('upload/users/pictures')) {
            mkdir('upload/users/pictures');
        }
    }

    /**
     * Save the User's picture.
     */
    public function savePicture()
    {
        if (!empty($this->attributes['picture'])) {
            $pictureId = bin2hex(random_bytes(10));
            $imageId = $this->getPictureId($pictureId);
            $handle = fopen($imageId, 'w');
            fwrite($handle, $this->attributes['picture']);
            fclose($handle);
            $this->attributes['picture'] = $pictureId;
        }
    }

    /**
     * Delete the User's picture.
     */
    public function deletePicture()
    {
        if (!empty($this->attributes['picture']) &&
            file_exists($file = $this->getPictureId($this->attributes['picture']))) {
            unlink($file);
        }
    }
}