<?php

namespace App\Support;

use Validator;

trait FilterPaginateOrder
{
    protected $operators = [
        'equal_to' => '=',
        'not_equal' => '<>',
        'less_than' => '<',
        'grater_than' => '>',
        'less_than_or_equal_to' => '<=',
        'grater_than_or_equal_to' => '>=',
        'in' => 'IN',
        'not_in' => 'NOT_IN',
        'like' => 'LIKE',
        'between' => 'BETWEEN'
    ];

    public function scopeFilterPaginateOrder($query)
    {
        $request = request();
        $validator = Validator::make(
            $request->all(),
            [
                'column' => 'required|in:' . implode(',', $this->filter),
                'direction' => 'required|in:asc,desc',
                'per_page' => 'required|integer|min:1',
                'search_operator' => 'required|in:' . implode(',', array_keys($this->operators)),
                'search_column' => 'required|in:' . implode(',', $this->filter),
                'search_query_1' => 'max:255',
                'search_query_2' => 'max:255'
            ]
        );

        if ($validator->fails()) {
            die(dump($validator->messages()));
        }

        return $query->orderBy($request->column, $request->direction)
            ->where(
                function ($query) use ($request) {
                    if ($request->has('search_query_1')) {
                        if ($this->isRelatedColumn($request)) {
                            [$relation, $relatedColumn] = explode('.', $request->search_column);
                            return $query->whereHas(
                                $relation,
                                function ($query) use ($relatedColumn, $request) {
                                    return $this->buildQuery(
                                        $relatedColumn,
                                        $request->search_operator,
                                        $request,
                                        $query
                                    );
                                }
                            );
                        } else {
                            return $this->buildQuery(
                                $request->search_column,
                                $request->search_operator,
                                $request,
                                $query
                            );
                        }
                    }
                }
            )->paginate($request->per_page);
    }

    protected function isRelatedColumn($request)
    {
        return strpos($request->search_column, '.') !== false;
    }

    protected function buildQuery($column, $operator, $request, $query)
    {
        switch ($operator) {
            case 'equal_to':
                break;
            case 'not_equal':
                break;
            case 'less_than':
                break;
            case 'grater_than':
                break;
            case 'less_than_or_equal_to':
                break;
            case 'grater_than_or_equal_to':
                $query->where($column, $this->operators[$operator], $request->search_query_1);
                break;
            case 'in':
                $query->whereIn($column, explode(',', $request->search_query_1));
                break;
            case 'not_in':
                $query->whereNotIn($column, explode(',', $request->search_query_1));
                break;
            case 'like':
                $query->where($column, 'like', '%' . $request->search_query_1 . '%');
                break;
            case 'between':
                $query->whereBetween(
                    $column,
                    [
                        $request->search_query_1,
                        $request->search_query_2
                    ]
                );
                break;
            default:
                throw new \Exception('Invalid Search Operator');
                break;
        }

        return $query;
    }
}